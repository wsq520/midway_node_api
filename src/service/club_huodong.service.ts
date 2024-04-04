import { Provide, Inject } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { ClubHuodong, Clubs, Student } from '../entity';
import { Repository } from 'typeorm';
import { QueryClubHuodongDTO, FuzzyQueryClubHuodongDTO, CreateClubHuodongDTO, DeleteClubHuodongDTO, UpdateClubhuodongDTO } from '../dto';
import { likeQueryHandler, isInStatusList } from '../utils'

@Provide()
export class ClubHuodongService {
  @InjectEntityModel(ClubHuodong)
  clubHuodongModel: Repository<ClubHuodong>;

  @InjectEntityModel(Clubs)
  clubsModel: Repository<Clubs>;

  @InjectEntityModel(Student)
  studentModel: Repository<Student>;


  async getClubHuodongList(params: FuzzyQueryClubHuodongDTO) {
    const { club_name, club_type, title, status } = params;

    const list = await this.clubHuodongModel.find({
      where: {
        ...likeQueryHandler("club_name", club_name),
        ...likeQueryHandler("club_type", club_type),
        ...likeQueryHandler("title", title),
      }
    })

    let res = [];
    for (const item of list) {
      const { club_id } = item;
      const club_info = await this.clubsModel.findOne({
        where: {
          club_id
        },
        select: ['club_name', 'club_type', 'avatar']
      })
      const { student_id } = club_info;
      const student_info = await this.studentModel.findOne({
        where: {
          student_id
        }
      })
      const { student_id: president_id, name: president_name } = student_info;
      res.push({
        // president_info: student_info,
        // president_id:
        president_id,
        president_name,
        ...club_info,
        ...item
      })
    }

    console.log("status:", status, typeof status, isInStatusList(status));

    if (isInStatusList(status)) {
      res = res.filter(item => item.status === status)
    }

    return res;
  }

  async deleteClubHuodongById(params: DeleteClubHuodongDTO) {
    const { huodong_id } = params;
    const origin = await this.clubHuodongModel.findOne({
      where: {
        huodong_id
      }
    })
    if (!origin) {
      return {
        message: '活动不存在，删除失败'
      }
    }
    const res = await this.clubHuodongModel.remove(origin);
    return {
      message: "删除成功",
      data: res
    }
  }

  async createClubHuodong(parmas: CreateClubHuodongDTO) {
    const res = await this.clubHuodongModel.save(parmas);
    return res;
  }

  async updateClubHuodong(params: UpdateClubhuodongDTO) {
    console.log("updateClubHuodong:", params);
    const { huodong_id, title, content, club_id, club_name, club_type, picture_url, status, starttime, endtime } = params;
    const origin = await this.clubHuodongModel.findOne({
      where: {
        huodong_id
      }
    })
    if (!origin) {
      return {
        message: "该活动不存在，更新失败"
      }
    }
    origin.title = title;
    origin.content = content;
    origin.club_id = club_id;
    origin.club_name = club_name;
    origin.club_type = club_type;
    origin.picture_url = picture_url;
    origin.starttime = starttime;
    origin.endtime = endtime;
    origin.status = status;
    const res = await this.clubHuodongModel.save(origin);
    return res;
  }
}
