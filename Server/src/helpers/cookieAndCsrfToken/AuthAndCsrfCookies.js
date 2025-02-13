const setAuthAndCsrfCookies = (res, authToken) => {
    res.cookie('auth_token', authToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000, 
    });

    if (typeof res.csrfToken === 'function') {
        res.cookie('XSRF-TOKEN', res.csrfToken(), {
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });
    } else {
        console.warn("Warning: res.csrfToken is not available. CSRF protection might not be working.");
    }
};



module.exports = setAuthAndCsrfCookies;
