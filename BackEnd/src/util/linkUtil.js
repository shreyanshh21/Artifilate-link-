// Example UserAgent:
//  Mozila/5.0 (Linux; Android 14; SM-S928W) AppleWebKit/537.36 (KHTML, like Gecko) 
//  Chrome/120.0.6099.230 Mobile Safari/537.36
const getDeviceInfo = (userAgent) => {
    const isMobile = /mobile/i.test(userAgent);
    const browser = userAgent.match(/(Chrome|Firefox|Safari|Edge|Opera)/i)?.[0] || 'unknown';
    return {
        isMobile,
        browser
    };
};

module.exports = { getDeviceInfo };