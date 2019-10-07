const express=require('express')
const path=require('path')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const weather=require('./utils/weather')

const publicDirectoryPath=path.join(__dirname,'/public')
    //we can change the directory in which node lloks for hbs files by creating a new path variable and then use app.set('views',pathName)
const viewPath=path.join(__dirname,'/templates/views')
const partialPath=path.join(__dirname,'/templates/partials')
const app=express()
const port=process.env.PORT || 3000
hbs.registerPartials(partialPath)
app.use(express.static(publicDirectoryPath))
app.set('view engine','hbs')
app.set('views',viewPath)

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Pravesh S Shetty'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Us',
        name:'Pravesh S Shetty'
    })           
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        body:'You can ask your queries here',
        name:'Pravesh S Shetty'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error:'Please provide an address to continue'
        })
    }
    location=req.query.address
        geocode(location,(error,{latitude,longitude,place}={})=>{
            if(error)
            {  return res.send({error:error})
            
            }  
            weather(latitude,longitude,(error,{temperature,summary,precipProbability})=>{
                    if(error)
                    {   return send({error:error})
                    }      
                        return res.send({
                            forecast:summary+". Temperature is "+temperature+" C outside and there is "+precipProbability+" % chances of rain",
                            location:place,
                        })
                    })  
                })
            }
)

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        body:'Help article not found',
        name:'Pravesh S Shetty'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        body:'Page not found',
        name:'Pravesh S Shetty'
    })
})

app.listen(port,()=>{
    console.log('Server is running')
})
