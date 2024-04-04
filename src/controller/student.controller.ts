import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query
} from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { StudentService } from '../service/student.service';
import { Student } from '../entity/Student';
import {
  QueryStudentDTO,
  CreateStudentDTO,
  DeleteStudentDTO,
  UpdateStudentDTO,
  FuzzyQueryStudentDTO
} from '../dto';
import { sendResponse } from '../utils'

@Controller('/student')
export class StudentController {
  @Inject()
  ctx: Context;

  @Inject()
  studentService: StudentService;

  @Get('/list')
  async studentList() {
    // console.log("获取学生信息列表");
    try {
      const res = await this.studentService.getStudentList();
      sendResponse(this.ctx, res);
    } catch (error) {
      sendResponse(this.ctx, null, error);
    }
  }

  @Get('/info')
  async studentInfoById(@Query() parmas: QueryStudentDTO) {
    try {
      // 这里返回的是单个对象
      // return res;
      const res = await this.studentService.getStudentById(parmas);
      sendResponse(this.ctx, res);
    } catch (error) {
      sendResponse(this.ctx, null, error);
    }
  }

  @Post('/create')
  async createStudent(@Body() body: CreateStudentDTO) {
    try {
      const s = new Student();
      const { xuehao, password, college, grade, major, classname, gender, phone, name } = body;
      s.xuehao = xuehao;
      s.password = password;
      s.college = college;
      s.grade = grade;
      s.major = major;
      s.classname = classname;
      s.gender = gender;
      s.phone = phone;
      s.name = name;
      const res = await this.studentService.createStudent(s);
      sendResponse(this.ctx, res);
    } catch (error) {
      console.log(error);
      sendResponse(this.ctx, null, error);
    }
  }

  @Get('/delete')
  async deleteStduent(@Query() parmas: DeleteStudentDTO): Promise<any> {
    try {
      // 删除成功 返回的是被删除的对象
      const res = await this.studentService.deleteStudent(parmas);
      sendResponse(this.ctx, res);
    } catch (error) {
      sendResponse(this.ctx, null, error);
    }
  }

  @Post('/update')
  async updateStudent(@Body() body: UpdateStudentDTO) {
    try {
      //修改成功后 将修改后的对象返回到客户端
      const res = await this.studentService.updateStudent(body);
      sendResponse(this.ctx, res);
    } catch (error) {
      sendResponse(this.ctx, null, error);
    }
  }

  @Get('/fuzzy/query')
  async fuzzyQueryStudent(@Query() parmas: FuzzyQueryStudentDTO) {
    const res = await this.studentService.fuzzyQueryStudent(parmas);
    return res;
  }
}
