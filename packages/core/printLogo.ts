export default function () {
    if (PROD) {
        const logo = `
  ______________________________________________________________
  
   _______ _______       _____   __ __                          
  |   |   |_     _|_____|     |_|__|  |--.----.---.-.----.--.--.
  |   |   |_|   ||______|       |  |  _  |   _|  _  |   _|  |  |
  |_______|_______|     |_______|__|_____|__| |___._|__| |___  |
                                                         |_____|                                           
  ______________________________________________________________
                           author: LiXiao
  `;

        const rainbowGradient = `
        background: linear-gradient(135deg, orange 60%, cyan);
        background-clip: text;
        color: transparent;
        font-size: 16px; 
        line-height: 1;
        font-family: monospace;
        font-weight: 600;
  `;

        console.info(`%c${logo}`, rainbowGradient);
    } else if (DEV) {
        console.log("[UILibrary]:dev mode...");
    }
}