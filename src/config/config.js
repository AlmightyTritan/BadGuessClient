/**
 * @desc This file contains the config Object
 * @since Jul 15 2017
 */

let config = {
    // Debug
    debug: true,

    // Cookies
    cookieDuration: 0.04,

    // Client
    clientUsername: 'BigScreenClient',
    roomPollRate: 500,

    // URL
    siteURL: 'https://dev.shatteredscreen.xyz/vdraw/',
    serverURL: 'https://dev.shatteredscreen.xyz/vdraw-server/',

    // Player
    usernameLimit: 12,
    playerLimit: 8,

    // Text
    adviceMessages: [
        'For the love of god! Don\'t draw a',
        'Hey Man, wanna not draw a',
        'Don\'t draw a',
        'I swear I\'ll rat you out to the cops if you draw a',
        'I... I... Uh just don\'t draw a',
        'Wow we\'d lose our PG-13 rating if you drew a',
    ],
}

// If debug build
if (config.debug) {
    // Overwrite with debug values
    config = Object.assign({}, config, {
        // URL
        siteURL: 'http://localhost:8080/',
        serverURL: 'http://localhost:8000/api/',
    });
}

// Export
export default config;
