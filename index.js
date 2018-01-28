'use strict';

const functions = require('firebase-functions'); // Cloud Functions for Firebase library
const App = require('actions-on-google').DialogflowApp; // Google Assistant helper library

//Arguments
const ACTIVITY_TYPE_ARGUMENT = 'activity_type';
const ACTIVITY_NAME_ARGUMENT = 'activity_name';
const USER_INFO_ARGUMENT = 'user_info';
const TIME_PERIOD_ARGUMENT = 'time_period';

//Actions
const END_STUDY_SESSION_ACTION = 'endStudySession';
const WELCOME_ACTION = 'welcome';

const ONE_STEP_START_BREAK_ACTION = 'oneStepStartBreak';
const TWO_STEP_START_BREAK_ACTION = 'twoStepStartBreak';

const ONE_STEP_START_STUDY_ACTION = 'oneStepStartStudy';
const TWO_STEP_START_STUDY_ACTION = 'twoStepStartStudy';

const ONE_STEP_START_EFFICIENCY_ACTION = 'oneStepStartEfficiency';
const TWO_STEP_START_EFFICIENCY_ACTION = 'twoStepStartEfficiency';

const ONE_STEP_START_STATS_ACTION = 'oneStepStartStats';
const TWO_STEP_START_STATS_ACTION = 'twoStepStartStats';

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
    const app = new App({request, response})
    console.log('Request headers: ' + JSON.stringify(request.headers));
    console.log('Request body: ' + JSON.stringify(request.body));

    function addStudyActivity(app) {
        let type = 'study';
        let name = app.getArgument(ACTIVITY_NAME_ARGUMENT);
        // TODO: code here
        // Add info to database
        app.tell('Okay, got it. Happy studying!'); //TODO: randomize this
    }

    function addBreakActivity(app) {
        let type = 'break';
        let name = app.getArgument(ACTIVITY_NAME_ARGUMENT);
        // TODO: code here
        // Add info to database
        app.tell('Sounds good. Enjoy your break!'); //TODO: randomize this
    }

    function endStudySession(app) {
        // TODO: code here
        // add info to database
        app.tell('That was a good study session! Come back soon!');
    }

    function getGreeting(app) {
        //TODO: code here
        //TODO: randomize this intro
        app.ask('Hi, you can call me Overseer! Are you going to start studying, take a break, or end your study session? Or maybe you want to view your statistics or efficiency?');
    }

    function getStats(app) {
        let userInfo = 'stats';
        let timePeriod = app.getArgument(TIME_PERIOD_ARGUMENT);
        app.tell('(Mock data) You spent 25% (1h) of your time on csc209, and 75% (3h) of your time on YouTube.'); //TODO: get real data
    }

    function getEfficiency(map) {
        let userInfo = 'efficiency';
        let timePeriod = app.getArgument(TIME_PERIOD_ARGUMENT);
        app.tell('(Mock data) You were 43% efficient today!'); //TODO: get real data
    }

    let actionMap = new Map();

    actionMap.set(ONE_STEP_START_BREAK_ACTION, addBreakActivity);
    actionMap.set(TWO_STEP_START_BREAK_ACTION, addBreakActivity);

    actionMap.set(ONE_STEP_START_STUDY_ACTION, addStudyActivity);
    actionMap.set(TWO_STEP_START_STUDY_ACTION, addStudyActivity);

    actionMap.set(ONE_STEP_START_EFFICIENCY_ACTION, getEfficiency);
    actionMap.set(TWO_STEP_START_EFFICIENCY_ACTION, getEfficiency);

    actionMap.set(ONE_STEP_START_STATS_ACTION, getStats);
    actionMap.set(TWO_STEP_START_STATS_ACTION, getStats);

    actionMap.set(END_STUDY_SESSION_ACTION, endStudySession);
    actionMap.set(WELCOME_ACTION, getGreeting);

app.handleRequest(actionMap);
});
