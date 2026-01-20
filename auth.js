const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { findUserByUSername } = require('/modules/user');

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const user = await findUserByUSername(username);

            if(!user) {
                return done(null, false, { message: 'Username incorect.'});
            }

            const passwordMatch = await bcrypt.compare(password, user.password);

            if(!passwordMatch) {
                return done(null, false, { message: 'Parola incorecta.'});
            }

            return done(null, user);
        } catch(error) {
            return done(error);
        }
    })
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await findUserById(id);
        done(null, user);
    } catch(error) {
        done(error);
    }
});