const weatherForm=document.querySelector('form')
const weatherInp=document.querySelector('input')
const msg1=document.querySelector('#message-1')
const msg2=document.querySelector('#message-2')

weatherForm.addEventListener(('submit'),(e)=>{
      e.preventDefault()
      msg1.textContent="Loading....."
      msg2.textContent=""
      const weather=weatherInp.value
      fetch('/weather?address='+weather).then((response)=>{
          response.json().then((data)=>{
              if(data.error)
              {
                  msg1.textContent=data.error;
                  msg2.textContent=""
              }
              else
              {
                  msg2.textContent=data.location
                  msg1.textContent=data.forecast
              }
          })
        })
          
})