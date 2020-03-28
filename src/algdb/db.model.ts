import { prop, modelOptions } from '@typegoose/typegoose'


@modelOptions({
        schemaOptions:{collection:'puzzles'},
})
export class algAllClass{
    @prop()
    public class:string
}


@modelOptions({
    schemaOptions:{collection:'puzzles'},
})
export class algPuzzles{
    @prop()
    public class:string

    @prop()
    public name?:string

    @prop()
    public imageSrc?:string

    @prop()
    public shortName?:string

    @prop()
    public updatedAt?:string
}



@modelOptions({
    schemaOptions:{collection:'puzzles'}
})
export class algtopCaseGroups{
    @prop()
    public class:string = 'topCaseGroups'

    @prop()
    public data?:object

    @prop()
    public updatedAt?:string
}



@modelOptions({
    schemaOptions:{collection:'puzzles'}
})
export class algStats{
    @prop()
    public class:string = 'stats'

    @prop()
    public algs?:number

    @prop()
    public cases?:number

    @prop()
    public users?:number

    @prop()
    public updatedAt?:string
}

@modelOptions({
    schemaOptions:{collection:'puzzlesets'}
})
export class algpuzzleSet{
    @prop()
    public class:string = 'puzzleSet'

    @prop()
    public puzzle?:string

    @prop()
    public puzzleSet?:string

    @prop()
    public name?:string

    @prop()
    public shortName?:string

    @prop()
    public hasChildren?:boolean

    @prop()
    public children?:string[]

    @prop()
    public imageSrc?:string

    @prop()
    public updatedAt?:string
}


@modelOptions({
    schemaOptions:{collection:'puzzlesubsets'}
})
export class algpuzzleSubSet{
    @prop()
    public class:string = 'puzzleSubSet'

    @prop()
    public puzzle?:string

    @prop()
    public puzzleSet?:string

    @prop()
    public puzzleSubSet?:string

    @prop()
    public name?:string

    @prop()
    public shortName?:string


    @prop()
    public imageSrc?:string

    @prop()
    public updatedAt?:string
}


@modelOptions({
    schemaOptions:{collection:'casegroups'}
})
export class algcaseGroup{
    @prop()
    public class:string = 'caseGroup'

    @prop()
    public puzzle?:string

    @prop()
    public groupName?:string

    @prop()
    public caseName?:string

    @prop()
    public name?:string

    @prop()
    public shortName?:string

    @prop()
    public caseGroupWholeName?:string

    @prop()
    public caseAlgs?:object[]

    @prop()
    public imageSrc?:string

    @prop()
    public updatedAt?:string
}

@modelOptions({
    schemaOptions:{collection:'cases'}
})
export class algCase{
    @prop()
    public class:string = 'case'

    @prop()
    public puzzle?:string

    @prop()
    public groupName?:string

    @prop()
    public caseName?:string

    @prop()
    public name?:string

    @prop()
    public shortName?:string

    @prop()
    public caseGroupWholeName?:string


    @prop()
    public caseAlgs?:object[]

    @prop()
    public imageSrc?:string

    @prop()
    public updatedAt?:string
}


export const ALG = [
    algAllClass,
    algCase,
    algcaseGroup,
    algPuzzles,
    algpuzzleSet,
    algpuzzleSubSet,
    algtopCaseGroups,
    algStats
]

// let algconn =  mongoose.createconnection('mongodb://kira:xiaoye520@localhost:27017/test',
// {
//   useNewUrlParser:true,
//   useFindAndModify:false,
//   useCreateIndex:true
// }
// )

//   @modelOptions({
//     schemaOptions:{collection:'puzzles'},
// })

// export const PuzzleModule = getModelForClass(Puzzle)

