import bcrypt from "bcryptjs";

const users = [
  {
    sponser: null,
    name: "Super Admin",
    email: "dreamzmeta@gmail.com",
    password: bcrypt.hashSync("pass123", 10),
    isAdmin: true,
    ownSponserId: "DM155465",
    earning: 0,
    transactions: [],
    userStatus: true,
    children: [],
    currentPlan: "promoter",
    autoPool: false,
    joiningAmount: 0,
    requestCount: [0, 1, 2, 3, 4]
  },
];

export default users;
