import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiProperty, ApiQuery } from '@nestjs/swagger'
import {algPuzzles, algAllClass, algtopCaseGroups, algStats, algpuzzleSet, algpuzzleSubSet, algcaseGroup, algCase} from './db.model';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';

class CreatePost{
    @ApiProperty({description:'标题'})
    title:string = 'title'
    @ApiProperty({description:'内容'})
    content:string = 'content'
}

class puzzleSetQuery {
    size:number = 20
    page:number = 1
    puzzle:string
    haschildren:string
    set:string
}

class puzzleSubSetQuery {
    size:number = 20
    page:number = 1
    puzzle:string
    set:string
    subset:string
}

class puzzleCaseGroupQuery {
    size:number = 20
    page:number = 1
    puzzle:string
    case:string
    group:string
}

class puzzleCaseQuery {
    size:number = 20
    page:number = 1
    puzzle:string
    case:string
    group:string
}


@Controller('algdb')
@ApiTags('algdb')
export class AlgdbController {
    // constructor( @InjectModel(Puzzle) private  readony puzzleModel : ReturnModelType<typeof Puzzle>) {
    //    null
    // }

    constructor(
        @InjectModel(algCase) private readonly caseModel : ReturnModelType<typeof algCase>,
        @InjectModel(algcaseGroup) private readonly caseGroupModel : ReturnModelType<typeof algcaseGroup>,
        @InjectModel(algPuzzles) private readonly puzzlesModel : ReturnModelType<typeof algPuzzles>,
        @InjectModel(algpuzzleSet) private readonly puzzleSetModel : ReturnModelType<typeof algpuzzleSet>,
        @InjectModel(algpuzzleSubSet) private readonly puzzleSubSetModel : ReturnModelType<typeof algpuzzleSubSet>,
        @InjectModel(algtopCaseGroups) private readonly topCaseGroupsModel : ReturnModelType<typeof algtopCaseGroups>,
        @InjectModel(algStats) private readonly statsModel : ReturnModelType<typeof algStats>,
        @InjectModel(algAllClass) private readonly allClassModel : ReturnModelType<typeof algAllClass>
        ){}

    @Get()
    @ApiOperation({summary:'首页',description:'algdb数据的国内缓存，解决国内访问algdb缓慢的问题，每日更新，数据格式与algdb保持一致'})
    index(){
        const html = `<h1>algdb China</h1>
        <p>algdb数据的国内缓存，解决国内访问algdb缓慢的问题，每日更新，数据格式与algdb保持一致</p>
        <h3>接口文档</h3>
        <li><a href="api-docs">/api-docs</a></li>
        <h3>例子</h3>
        <li><a href="algdb/puzzles">获取收录魔方种类/puzzles</a></li>
        <li><a href="algdb/topcasegroups">获取热门case/topcasegroups</a></li>
        <li><a href="algdb/stats">获取algdb网站统计/stats</a></li>
        <li><a href="algdb/puzzleset">获取set公式集合列表/puzzleset</a></li>
        <li><a href="algdb/puzzlesubset">获取subset子公式集列表/puzzlesubset</a></li>
        <li><a href="algdb/puzzlesubset?set=vls">获取subset子公式集列表如vls/puzzlesubset?set=vls</a></li>
        <li><a href="algdb/casegroup">获取casegroup列表/casegroup</a></li>
        <li><a href="algdb/case">获取每个case的数据/case</a></li>
        <li><a href="algdb/case?case=f2l1">获取f2l1数据/case?case=f2l1</a></li>
        <h3>query参数</h3>
        <p>大部分接口都支持分页操作</p>
        <p>格式：algdb/name?size=50&page=1</p>
        <p>部分接口可以精确查询，具体可在文档中看到</p>
        <h3>反馈</h3>
        <a >hanzhaoapply@gmail.com</a>
        <a target="_blank" href="https://github.com/kirahan" about>github: kirahan</a>
        <a target="_blank" href="https://kirahan.github.io">个人博客</a>
        <h1>enjoy!</h1>
        `
        return html
    }

    @Get('allclass/:classname')
    @ApiOperation({summary:'获取某个类的数据'})
    async allclass(@Param('classname') classname:string){
        return this.allClassModel.find({class : classname})
    }    

    @Get('puzzles')
    @ApiOperation({summary:'获取所有魔方'})
    async puzzles(){
        return this.puzzlesModel.find({class : 'puzzle'})
    }

    @Get('puzzles/:puzzlename')
    @ApiOperation({summary:'获取特定魔方的数据'})
    async puzzle(@Param('puzzlename') puzzlename:string){
        return this.puzzlesModel.findOne({class : 'puzzle', shortName:puzzlename})
    }

    @Get('topcasegroups')
    @ApiOperation({summary:'获取热门case情况'})
    async topcase(){
        return this.topCaseGroupsModel.find({class : 'topCaseGroups'})
    }

    @Get('stats')
    @ApiOperation({summary:'获取algdb网站数据'})
    async stats(){
        return this.statsModel.find({class : 'stats'})
    }

    @Get('puzzleset')
    @ApiOperation({summary:'获取set公式集合列表'})
    @ApiQuery({name:'size',required:false,allowEmptyValue:true,example:20,description:'每页显示'})
    @ApiQuery({name:'page',required:false,allowEmptyValue:true,example:1,description:'页码'})
    @ApiQuery({name:'puzzle',required:false,allowEmptyValue:true,enum:['222','333'],description:'魔方类型'})
    @ApiQuery({name:'set',required:false,allowEmptyValue:true,example:'',description:'集合名字'})
    @ApiQuery({name:'haschildren',required:false,allowEmptyValue:true,example:'',description:'是否有子集'})
    async puzzleSet(@Query() query:puzzleSetQuery){
        let QueryObj:any = {class :'puzzleSet'}
        query.puzzle ? QueryObj.puzzle = query.puzzle : null
        query.set ? QueryObj.puzzleSet = query.set : null
        query.haschildren ? QueryObj.hasChildren = query.haschildren ==='true' : null
        const pagesize:number = Number(query.size) || 20
        const page:number = Number(query.page) || 1
        const total = await this.puzzleSetModel.find(QueryObj).count().exec()
        const puzzlesets = await this.puzzleSetModel.find(QueryObj).populate('').limit(pagesize).skip((page-1)*pagesize).exec()
        const lastpage = Math.floor(total/pagesize) + 1
        return {
            code :'200',
            current_page :page,
            size : pagesize,
            lastpage,
            total,
            data : puzzlesets
        } 
        // return this.puzzleSetModel.find({class : 'puzzleSet'})
    }

    @Get('puzzleSubSet')
    @ApiOperation({summary:'获取subset子公式集列表'})
    @ApiQuery({name:'size',required:false,allowEmptyValue:true,example:20,description:'每页显示'})
    @ApiQuery({name:'page',required:false,allowEmptyValue:true,example:1,description:'页码'})
    @ApiQuery({name:'puzzle',required:false,allowEmptyValue:true,enum:['222','333'],description:'魔方类型'})
    @ApiQuery({name:'set',required:false,allowEmptyValue:true,example:'',description:'集合名字'})
    @ApiQuery({name:'subset',required:false,allowEmptyValue:true,example:'',description:'子集合名字'})
    async puzzleSubSet(@Query() query:puzzleSubSetQuery){
        let QueryObj:any = {class :'puzzleSubSet'}
        query.puzzle ? QueryObj.puzzle = query.puzzle : null
        query.set ? QueryObj.puzzleSet = query.set : null
        query.subset ? QueryObj.puzzleSubSet = query.subset : null
        const pagesize:number = Number(query.size) || 20
        const page:number = Number(query.page) || 1
        const total = await this.puzzleSubSetModel.find(QueryObj).count().exec()
        const puzzlesubsets = await this.puzzleSubSetModel.find(QueryObj).populate('').limit(pagesize).skip((page-1)*pagesize).exec()
        const lastpage = Math.floor(total/pagesize) + 1
        return {
            code :'200',
            current_page :page,
            size : pagesize,
            lastpage,
            total,
            data : puzzlesubsets
        } 
    }

    @Get('caseGroup')
    @ApiOperation({summary:'获取casegroup列表'})
    @ApiQuery({name:'size',required:false,allowEmptyValue:true,example:20,description:'每页显示'})
    @ApiQuery({name:'page',required:false,allowEmptyValue:true,example:1,description:'页码'})
    @ApiQuery({name:'puzzle',required:false,allowEmptyValue:true,enum:['222','333'],description:'魔方类型'})
    @ApiQuery({name:'group',required:false,allowEmptyValue:true,example:'',description:'group名称'})
    @ApiQuery({name:'case',required:false,allowEmptyValue:true,example:'',description:'case名称'})
    async caseGroup(@Query() query:puzzleCaseGroupQuery){
        let QueryObj:any = {class :'caseGroup'}
        query.puzzle ? QueryObj.puzzle = query.puzzle : null
        query.group ? QueryObj.groupName = query.group : null
        query.case ? QueryObj.caseName = query.case : null
        const pagesize:number = Number(query.size) || 20
        const page:number = Number(query.page) || 1
        const total = await this.caseGroupModel.find(QueryObj).count().exec()
        const caseGroups = await this.caseGroupModel.find(QueryObj).populate('').limit(pagesize).skip((page-1)*pagesize).exec()
        const lastpage = Math.floor(total/pagesize) + 1
        return {
            code :'200',
            current_page :page,
            size : pagesize,
            lastpage,
            total,
            data : caseGroups
        } 
    }

    @Get('case')
    @ApiOperation({summary:'获取每个case的数据'})
    @ApiQuery({name:'size',required:false,allowEmptyValue:true,example:20,description:'每页显示'})
    @ApiQuery({name:'page',required:false,allowEmptyValue:true,example:1,description:'页码'})
    @ApiQuery({name:'puzzle',required:false,allowEmptyValue:true,enum:['222','333'],description:'魔方类型'})
    @ApiQuery({name:'group',required:false,allowEmptyValue:true,example:'',description:'group名称'})
    @ApiQuery({name:'case',required:false,allowEmptyValue:true,example:'',description:'case名称'})
    async case(@Query() query:puzzleCaseQuery){
        let QueryObj:any = {class :'case'}
        query.puzzle ? QueryObj.puzzle = query.puzzle : null
        query.group ? QueryObj.groupName = query.group : null
        query.case ? QueryObj.caseName = query.case : null
        const pagesize:number = Number(query.size) || 20
        const page:number = Number(query.page) || 1
        const total = await this.caseModel.find(QueryObj).count().exec()
        const cases = await this.caseModel.find(QueryObj).populate('').limit(pagesize).skip((page-1)*pagesize).exec()
        const lastpage = Math.floor(total/pagesize) + 1
        return {
            code :'200',
            current_page :page,
            size : pagesize,
            lastpage,
            total,
            data : cases
        } 
    }






    @Post()
    // api title
    @ApiOperation({summary:'创建'})
    // 加上装饰器才能知道是需要什么数据，而且顺序不重要了
    create(@Body() body:CreatePost,@Query() query, @Param() params){
        return {
            success : true,
            data : 'hello'
        }
    }
}
