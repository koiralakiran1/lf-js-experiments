var someone = {
    name:'Someone',
    address: 'kirtipur',
    emails: 'someone@somesite.com',
    interests:['something', 'something else'],
    education: [{
      name: 'MIT',
      enrolledDate: '1990'
    }, {
      name: 'Harvard',
      enrolledDate: '2007'
    }]
  };
  for(i=0; i<someone.education.length; i++) {
      console.log('Name: ' + someone.education[i].name +', Date: ' + someone.education[i].enrolledDate);
  }
