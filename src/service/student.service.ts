import { Provide, Inject } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Student } from '../entity/Student';
import { Like, Repository } from 'typeorm';
import { QueryStudentDTO, CreateStudentDTO, DeleteStudentDTO, UpdateStudentDTO, FuzzyQueryStudentDTO } from '../dto';
import { ClubmemberService } from './clubmember.service';

@Provide()
export class StudentService {
  @InjectEntityModel(Student)
  studentModel: Repository<Student>;


  async getStudentList() {
    // const key = 'userList';
    // await this.cache_service.isExist(key);
    // const cacheRes = await this.cache_service.getCache(key);
    // if (cacheRes) {
    //   return cacheRes;
    // }
    const studentList = await this.studentModel.find();
    // await this.cache_service.setCache(key, userList);
    return studentList;
  }

  async getStudentById(params: QueryStudentDTO) {
    // console.log(id);
    const { student_id } = params;
    const stu = await this.studentModel.findOne({
      where: {
        student_id
      },
    });
    // console.log(user);
    return stu;
  }

  async createStudent(s: CreateStudentDTO) {
    const { xuehao } = s;
    const isExist = await this.studentModel.findOne({
      where: {
        xuehao
      }
    })
    if (isExist) return {
      message: "该学号已被注册，操作失败"
    }
    const res = await this.studentModel.save(s)
    return {
      message: "注册成功",
      ...res
    };
  }

  async deleteStudent(params: DeleteStudentDTO) {
    const { student_id } = params;
    const student = await this.studentModel.findOne({
      where: {
        student_id
      }
    });
    if (!student) {
      console.log("学生不存在");
      return;
    }
    const res = await this.studentModel.remove(student);
    return res;
  }

  async updateStudent(parmas: UpdateStudentDTO) {
    const { student_id, college, grade, major, classname, gender, phone, name, password, xuehao } = parmas;
    const origin = await this.studentModel.findOne({
      where: {
        student_id
      }
    })
    if (!origin) return {
      message: '该学生不存在,删除失败'
    };
    origin.xuehao = xuehao;
    origin.college = college;
    origin.grade = grade;
    origin.major = major;
    origin.classname = classname;
    origin.gender = gender;
    origin.phone = phone;
    origin.name = name;
    origin.password = password;
    const res = await this.studentModel.save(origin);
    return {
      message: "修改成功",
      data: res
    };
  }

  async fuzzyQueryStudent(params: FuzzyQueryStudentDTO) {
    const whereConditions: any = {};
    const { name, major, college, xuehao } = params;
    const handler = (field: any, value) => {
      if (!value) return;
      whereConditions[field] = Like(`%${value}%`);
    }

    handler("name", name);
    handler("major", major);
    handler("college", college);
    handler("xuehao", xuehao);

    // console.log(whereConditions);

    const res = await this.studentModel.find({
      where: whereConditions
    })

    return res;
  }
}
