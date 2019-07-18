
const API=require('../api/api');

module.exports= app =>{
app.post('/create',API.createNewUser());
app.get('/find/:id',API.findUser());
app.get('/filterage/:age', API.filterByAge());
app.get('/filtername/:name' ,API.filterByName());
app.get('/filterprof/:profession',API.filterByProf());
app.get('/filtercity/:address',API.filterByCity());
app.get('/filtergender/:gender',API.filterByGender());
app.get('/update/:id',API.updateById());
app.get('/search/', API.search());
app.get('/delete/:id', API.deleteById());
}