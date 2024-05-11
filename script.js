const textarea = $('.term');
let currentIndex = 0;
let dataIndex = 0;
const startScript = './welcome.sh';

$(".container").hide();

const scripts = [
    './start.sh',
    'imlollotv',
    '*********',
    'Yes\n',
    'ImLolloTv',
    'imlollotv',
];

const prompts = [
    "Please state the user you would like to add > ",
    "Please set the password for 'imlollotv' > ",
    "Shall we create a home directory for 'imlollotv' > ",
    "Directory Created, time for your socials!\n\nPlease state your GitHub username, if none put 'N/A' > ",
    "Please state your Discord username, if none put ' N/A ' > ",
];

const output = [
    "\nInformation complete! Initializing database.",
    "debug: Creating user account 'imlollotv'",
    "debug: Setting user account password",
    "debug: Creating user home directory, /home/imlollotv",
    "debug: Granting sudo privileges to user 'imlollotv'",
    "debug: Setting GitHub account name 'ImLolloTv'",
    "debug: Setting Discord username 'imlollotv'",
    "debug: Account initialized!",
];

function displayText(text, callback) {
    if (currentIndex < text.length) {
        textarea.append(`<span style="color: #cd0000;">${text.charAt(currentIndex)}</span>`);
        currentIndex++;
        setTimeout(() => displayText(text, callback), Math.floor(Math.random() * 80) + 55);
    } else {
        currentIndex = 0;
        textarea.append("<br>");
        if (callback) callback();
    }
}

function runScriptAndPrompt() {
    if (dataIndex < scripts.length) {
        displayText(scripts[dataIndex], () => {
            currentIndex = 0;
            if (prompts[dataIndex]) {
                textarea.append(`<span style="color: #ffffff;">${prompts[dataIndex]}</span>`);
            }
            dataIndex++;
            runScriptAndPrompt();
        });
    } else {
        currentIndex = 0;
        setTimeout(() => runFeedback(), 650);
    }
}

function runFeedback() {
    let time = 1;
    const interval = setInterval(() => {
        if (currentIndex < output.length) {
            textarea.append(`<span style="color: #ffffff;">[${(currentIndex / 1000).toFixed(3)}] ${output[currentIndex]}<br></span>`);
            currentIndex++;
        } else {
            clearInterval(interval);
            currentIndex = 0;
            textarea.append("<br>Initialising...<br>");
            setTimeout(() => {
                $(".load").fadeOut(2000);
                setTimeout(() => {
                    $(".container").fadeIn(2000);
                }, 2100);
            }, 1000);

        }
    }, time);
}

runScriptAndPrompt();
