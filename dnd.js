//dnd规则下的战斗
function round(n,d){
    let result = 0
    for (var i=1;i<=n;i++){
        let r = Math.round(Math.random() * d)
        // console.log('第' + i + '次掷骰结果为：' + r)
        result = result + r
    }
    // console.log('掷骰结果为' + result)
    return result
}
function addpoint(att){
    return Math.floor((att - 10) / 2)
}
function item (name,atk,def,damage,boom){
    this.name = name;
    this.atk = atk;
    this.def = def;
    this.damage = damage;
    this.boom = boom;
}
function hero(name,ll,mj,tz,zl,gy){
    this.name = name;
    this.ll = ll;
    this.mj = mj;
    this.tz = tz;
    this.zl = zl;
    this.gy = gy;
    this.atk  = 0;
    this.def = 0;
    this.boom = 20;
    this.item = null;
    this.hp = round(1,8) + addpoint(tz)
    // console.log(this.name + '的生命值为' + this.hp)
}

hero.prototype.getitem = function(item){
    if(this.item != null){
        this.atk = this.atk - this.item.atk
        this.def = this.atk - this.item.def
        this.boom = 20
        console.log('换下装备' + this.item.name)
    }
    this.item = item
    this.atk = this.atk + item.atk
    this.def = this.atk + item.def
    this.boom = item.boom
    console.log(this.name + '装备' + item.name)
    console.log(this.name + '的生命值为' + this.hp + ' 命中为' + this.atk + ' 防御等级为' + this.def)
}

hero.prototype.attack = function (hero){
    //计算暴击
    console.log(this.name + '开始攻击' + hero.name)
    let a = round(1,20)
    let boom = false
    if(a >= this.boom){
        console.log('发生暴击：' + a)
        boom = true
    }
    //计算命中
    if(a + this.atk < hero.def){
        console.log('未命中：' + this.atk + ' + ' + a + ' VS ' + hero.def)
    }else {
        console.log('命中：' + this.atk + ' + ' + a + ' VS ' + hero.def)
        //计算伤害
        if (boom){
            let b = round(this.item.damage[0],this.item.damage[1])
            let c = round(this.item.damage[0],this.item.damage[1])
            console.log(this.name + '对' + hero.name + '造成了暴击：' + b + '+' + c + '=' + (b+c) +  '点伤害' )
            hero.hp = hero.hp - (b+c)
            console.log(hero.name + '的血量为' + hero.hp)
        }else {
            let b = round(this.item.damage[0],this.item.damage[1])
            console.log(this.name + '对' + hero.name + '造成了：' + b + '点伤害' )
            hero.hp = hero.hp - b
            console.log(hero.name + '的血量为' + hero.hp)
        }
    }
}

function init(){
    let yasuo = new hero('亚索',12,15,20,10,10)
    let diandao = new item('电刀',4,8,[2,5],10)
    yasuo.getitem(diandao)
    let manwang = new hero('蛮王',12,15,25,10,10)
    let wujin = new item('无尽',6,4,[1,10],18)
    manwang.getitem(wujin)
    //先攻判定
    let shaizi =  Math.round(100 * Math.random())
//zhandou
    if(shaizi > 50){
        fighting(manwang,yasuo)
    }else{
        fighting(yasuo,manwang)
    }

}
function fighting(hero1,hero2){
    while(hero1.hp > 0 && hero2.hp >0){
        hero1.attack(hero2);
        if(hero2.hp <= 0){
            break;
        }
        hero2.attack(hero1)
    }
}
init()
