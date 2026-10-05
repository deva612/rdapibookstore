const User = require('./models/User')
const bcrypt = require('bcrypt')
async function createAdmin(){
    try {
        let user = await User.findOne({email: 'Devatyagi03@gmail.com'});
        if(user){
            console.log('user updated successfully....');   
        }else{
            user = new User();
            user.firstName= 'Deva';
            user.lastName= 'tyagi';
            user.mobileNo = '7060059260';
            user.email= "Devatyagi03@gmail.com";
            let password = bcrypt.hashSync('12345678',10);
            user.password = password;
            user.userType= 'admin';
            await user.save();
            console.log("user created successfully.......");
            
        }
    } catch (err) {
        console.log(err);
        
    }
}
module.exports = createAdmin;