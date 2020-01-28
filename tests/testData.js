const fakeMessages = {
  id: 1,
  createdOn: '10/12/2018',
  subject: 'Greetings',
  message: 'hello my friend',
  parentMessageId: 1,
  receiver: 1,
  status: 'sent'
};

const fakeMessages2 = {
  subject: 'Greetings',
  message: 'hello my friend',
  parentMessageId: 1,
  receiver: 1,
  status: 'sent'
};
const fakeMessages3 = {
  subject: 'Greetings',
  Message: 'hello my friend',
  status: 'sent'
};

const fakeUsers = {
  email: 'murediana@gmail.com',
  firstName: 'Gloria',
  lastName: 'atete',
  password: 'Diane123',
  role: 'Groupadmin'
};
const fakeUsers2 = {
  email: 'murediana@gmail.com',
  firstName: 'Gloria',
  password: 'Diane123'
};
const fakeLogin = {
  email: 'murediana@gmail.com',
  password: 'Diane123'
};
const fakeLogin2 = {
  password: 'diane123',
  firstName: 'Gloria'
};
const fakeLogin1 = {
  email: 'murediana@gmail.com'
};
const fakeGroups = {
  groupName: 'firstGroup'
};
const fakeGroups1 = {
  id: 1,
  groupname: 'newone',
  groupowner: 12,
  createdon: '2019-04-10T18:01:11.083Z',
  updatedon: '2019-04-10T18:01:11.083Z'
};

const fakeMember1 = {
  id: 39,
  groupid: 4,
  groupowner: 16,
  userid: 1,
  role: 'groupmember',
  createdon: '2019-04-17T14:57:29.500Z',
  updatedon: '2019-04-17T14:57:29.500Z'
};
const fakeMember = {
  userId: 1,
  role: 'groupmember'
};

export {
  fakeMessages,
  fakeMessages2,
  fakeUsers,
  fakeLogin,
  fakeMessages3,
  fakeUsers2,
  fakeLogin2,
  fakeGroups,
  fakeGroups1,
  fakeMember1,
  fakeMember,
  fakeLogin1
};
