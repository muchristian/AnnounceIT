const users = [{
    id:1,
    first_name:'Mucyo',
    last_name:'Christian',
    email:'mucyochristian2@gmail.com',
    password:'chris32',
    phoneNumber:'0782728660',
    address:'kigali',
    is_admin:false
}];

const announces = [{
    id:1,
    owner:1,
    status:'pending',
    text:'No problems have been detected in the workspace so far',
    start_date: new Date(),
    end_date: new Date()
}];

export { users, announces };