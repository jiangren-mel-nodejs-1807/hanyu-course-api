module.exports = async function (app) {
    var User = app.models.Member;
    var Role = app.models.Role;
    var RoleMapping = app.models.RoleMapping;
    var Team = app.models.Team;

    User.findOne({
        where: {
            username: 'admin'
        }
    }, function (err, existedAdmin) {
        if (err || existedAdmin) {
            console.log('admin existed');
        } else {
            User.create([
                { username: 'admin', email: 'admin@admin.com', password: 'admin' }
            ], function (err, users) {
                //create the admin role
                Role.create({
                    name: 'admin'
                }, function (err, role) {
                    if (err) throw err;

                    console.log('Created role:', role);

                    //make bob an admin
                    role.principals.create({
                        principalType: RoleMapping.USER,
                        principalId: users[0].id
                    }, function (err, principal) {
                        if (err) throw err;

                        console.log('Created principal:', principal);
                    });
                });
            })
        }
    })
};