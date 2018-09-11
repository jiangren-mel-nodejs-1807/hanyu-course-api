'use strict';

module.exports = function(Enrollment) {
    // check the existence of the new enrollment
    Enrollment.beforeRemote('create', function(context, user, next) {
        Enrollment.findOne({
            where: {
                courseId: context.req.body.courseId,
                studentId: context.req.body.studentId
            }
        }, function(err, results) {
            if (err || results) {
                context.res.status(400).send("enrollment existed");
            } else {
                next();
            }
        })
    })
};
