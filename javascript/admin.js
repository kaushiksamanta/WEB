var usr_data;
function checkActiveUser()
{
  var flag=true;
	var usr_data1=getCookie();
	for(var i=0;i<usr_data1.length;i++)
		if(usr_data1[i].flag!="")
		{
      flag=false;
      user=""+usr_data1[i].firstname+" "+usr_data1[i].surname;
      user_email=usr_data1[i].email;
      create_user_pannel();
      if(post!="")
      {
        document.getElementById("get_started").innerHTML="";
        document.getElementById("post_area").innerHTML=post;
      }
    }
  if(flag)
    window.location.assign("facebook.html");
}
function getCookie()
{
	var obtain_data=document.cookie.split("~");
	var usr_data=[];
	for(var i=0;i<obtain_data.length-1;i++)
	{
		var data={"email":"","firstname":"","surname":"","dob":"","passwd":""};
		data.email=obtain_data[i].slice(obtain_data[i].indexOf("=")+1,obtain_data[i].indexOf(":"));
		obtain_data[i]=obtain_data[i].slice(obtain_data[i].indexOf(":")+1);
		data.firstname=obtain_data[i].slice(obtain_data[i].indexOf("=")+1,obtain_data[i].indexOf(":"));
		obtain_data[i]=obtain_data[i].slice(obtain_data[i].indexOf(":")+1);
		data.surname=obtain_data[i].slice(obtain_data[i].indexOf("=")+1,obtain_data[i].indexOf(":"));
		obtain_data[i]=obtain_data[i].slice(obtain_data[i].indexOf(":")+1);
		data.dob=obtain_data[i].slice(obtain_data[i].indexOf("=")+1,obtain_data[i].indexOf(":"));
		obtain_data[i]=obtain_data[i].slice(obtain_data[i].indexOf(":")+1);
		data.passwd=obtain_data[i].slice(obtain_data[i].indexOf("=")+1);
		usr_data[i]=data;
	}
	return usr_data;
}
function create_user_pannel()
{
	usr_data=getCookie();
	var data="<table class='table table-striped'><thead><tr><th>S.No.</th><th>First_Name</th><th>Last_Name</th><th>E-mail</th><th>Birth_date</th><th>Selected</th></tr></thead><tbody>";
	for(var i=0;i<usr_data.length;i++)
	{
		data+="<tr><td>"+(i+1)+"</td><td>"+usr_data[i].firstname+"</td><td>"+usr_data[i].surname+"</td><td>"+usr_data[i].email+"</td><td>"+usr_data[i].dob+"</td><td><input type='checkbox' id='"+i+"'></input></td></tr>";
	}
	document.getElementById("users").innerHTML=data+"</tbody></table>";
	if(usr_data.length)
		document.getElementById("del_button").innerHTML="<button type='button' class='btn btn-warning btn-md center-block' onclick='deleteCookies()'>Delete Users</button>";
	else
		document.getElementById("del_button").innerHTML="";
}
function getUsersToDelete()
{
	var incr=0;
	var usr_to_delete=[];
	for(var i=0;i<usr_data.length;i++)
	{
		if(document.getElementById(''+i).checked)
			usr_to_delete[incr++]=usr_data[i].email;
	}
	return usr_to_delete;
}
function deleteCookies()
{
	var flag=0;
	var usr_to_delete=getUsersToDelete();
	var obtain_data=document.cookie.split("~");
	document.cookie="email=delete;expires=Thu, 01 Jan 1970;";
	for(var i=0;i<usr_data.length;i++)
	{
		for(var j=0;j<usr_to_delete.length;j++)
			if(usr_to_delete[j]==usr_data[i].email)
			{
				flag=1;
				break;
			}
			if(flag)
			{
				flag=0;
				continue;
			}
			else
				document.cookie+=obtain_data[i]+"~";
		}
		window.location.reload(true);
}
