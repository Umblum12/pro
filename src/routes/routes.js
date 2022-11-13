const {Router} = require(`express`);
const uuid = require(`uuid`);
const router = Router();
const fs = require('fs');

let readjson=fs.readFileSync('src/user.json', 'utf-8')
let userList=JSON.parse(readjson);

router.get('/',(req,res)=>{
    res.render('index.ejs',{userList
    });
})

router.get('/user_new',(req,res)=>{
    res.render('new_user.ejs');
})

router.post('/user_new',(req,res)=>{
    const {name, phone, email, description} = req.body;
    //validacion
    const user ={
        id: uuid.v4(),
        name,
        phone,
        email,
        description
    }
    userList.push(user);
    const json_user=JSON.stringify(userList);
    fs.writeFileSync('src/user.json', json_user, 'utf-8');
    res.redirect('/');
})


router.get('/edit_new/:id',(req,res)=>{
    const currentData = JSON.parse(fs.readFileSync('src/user.json', 'utf-8'));
    console.log(currentData);
    let newusers= currentData.filter(user =>{ 
        return req.params.id == user.id});
        console.log(newusers);
        res.render('Edit_user.ejs', {newusers});
    });


router.get('/delete/:id',(req,res)=>{
    userList= userList.filter(user => user.id !=req.params.id);
    const json_user=JSON.stringify(userList);
    fs.writeFileSync('src/user.json',json_user ,'utf-8');
    res.redirect('/');
})

router.post('/Edit_user',(req,res)=>{
    const currentData = JSON.parse(fs.readFileSync('src/user.json'));
    currentData.forEach(user=> {
        if(user.uuid == req.body.id) {
            user.name = req.body.name.length == 0 ? user.name : req.body.name;
            user.phone = req.body.phone.length == 0 ? user.phone : req.body.phone;
            user.email = req.body.email.length == 0 ? user.email : req.body.email;
            user.description = req.body.description.length == 0 ? user.description : req.body.description;
        } 
    });
    fs.writeFileSync('src/user.json', JSON.stringify(currentData), 'utf-8');
    res.redirect('/');
    console.log("ESTOY FUNCIONANDO WE");
    console.log(currentData);
});

module.exports=router;