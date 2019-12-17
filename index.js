// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
const Alexa = require('ask-sdk-core');
const persistenceAdapter = require('ask-sdk-s3-persistence-adapter');
var value = 0;
// Insert questions to be randomed
// const Question1IntentHandler = {
//     canHandle(handlerInput) {
//       return handlerInput.requestEnvelope.request.type === 'IntentRequest'
//             && handlerInput.requestEnvelope.request.intent.name === 'Question1IntentHandler';
//     },
//     async handle(handlerInput) {
//         const answer = handlerInput.requestEnvelope.request.intent.slots.answer.value; 
        
//         const questions = ['1', '2', '3', '4', '5', '6'];
//         const speakOutput = questions[i];
        
//         if(i > 4) {
//             return handlerInput.responseBuilder
//             .speak(speakOutput)
//             //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
//             .getResponse();
//         } else {
//             return handlerInput.responseBuilder
//             .speak(speakOutput)
//             .reprompt(questions[i])
//             .getResponse();
//         }
//         i += 1;
//     }
// };

const LaunchRequestHandler = {
    canHandle(handlerInput) {
       // return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Hello! What is your name?';
        const repromptText = 'Sorry, can you repeat your name?'; 
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(repromptText)
            .getResponse();
    }
};

const HasBirthdayLaunchRequestHandler = {    
    canHandle(handlerInput) {
        
        const attributesManager = handlerInput.attributesManager;        
        const sessionAttributes = attributesManager.getSessionAttributes() || {};
        
        const name = sessionAttributes.hasOwnProperty('name') ? sessionAttributes.name : 0;       
        
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest' && name;
    },    
   async handle(handlerInput) {
        const serviceClientFactory = handlerInput.serviceClientFactory;
        const deviceId = handlerInput.requestEnvelope.context.System.device.deviceId;
        const attributesManager = handlerInput.attributesManager;        
        const sessionAttributes = attributesManager.getSessionAttributes() || {};
        
        const name = sessionAttributes.hasOwnProperty('name') ? sessionAttributes.name : 0;        

        // TODO:: Use the settings API to get current date and then compute how many days until user's birthday       
        // TODO:: Say Happy birthday on the user's birthday
        
        const speakOutput = `Welcome back ${name}. Shall we begin?`;
        
        return handlerInput.responseBuilder            
        .speak(speakOutput)            
        .getResponse();    
        
    } 
    
};


const YesIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === "IntentRequest"
        && handlerInput.requestEnvelope.request.intent.name === "AMAZON.YesIntent";
    },
    handle(handlerInput){
        const speechText = `In a scale of 0-3, how are you feeling?`;
        
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse
    }
}
       
    

const CaptureBirthdayIntentHandler = {
    canHandle(handlerInput) {
       return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'CaptureBirthdayIntent'
            // && Alexa.getIntentName(handlerInput.requestEnvelope) === 'QuestionOneIntentHandler'
            // && Alexa.getIntentName(handlerInput.requestEnvelope) === 'QuestionTwoIntentHandler'
            // && Alexa.getIntentName(handlerInput.requestEnvelope) === 'FinalIntentHandler'
    },
    async handle(handlerInput) {
        const name = handlerInput.requestEnvelope.request.intent.slots.name.value;
        const answerone = handlerInput.requestEnvelope.request.intent.slots.answerone.value; 
        const answertwo = handlerInput.requestEnvelope.request.intent.slots.answertwo.value; 

        
        const attributesManager = handlerInput.attributesManager;
        
        const birthdayAttributes = { 
            "name" : name, 
            
        };
        
        attributesManager.setPersistentAttributes(birthdayAttributes);
        await attributesManager.savePersistentAttributes();

        const speakOutput = `Thanks, I'll remember that your name is ${name}. Shall we begin?`;
        
        // if(answerone && answertwo) {
        //     value = answerone + answertwo;
        //     const speakOutput = `Your value is ${value}.`;
        //     return handlerInput.responseBuilder
        //         .speak(speakOutput)
        //         // .reprompt('add a reprompt if you want to keep the session open for the user to respond')
        //         .getResponse();
        // }
        return handlerInput.responseBuilder
            .speak(speakOutput)
            // .reprompt('add3')
            .getResponse();
    }
};

const QuestionOneIntentHandler = {
    canHandle(handlerInput) {
       return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'QuestionOneIntent';
    },
    async handle(handlerInput) {
        // const begin = handlerInput.requestEnvelope.request.intent.slots.begin.value;
        // const name = handlerInput.requestEnvelope.request.intent.slots.name.value; 

        const speakOutput = `In a scale of 0-3, how are you feeling?`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('Sorry i did not get your answer.')
            .getResponse();
    }
};


const QuestionTwoIntentHandler = {
    canHandle(handlerInput) {
       return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'QuestionTwoIntent';
    },
    async handle(handlerInput) {
        // const answer = handlerInput.requestEnvelope.request.intent.slots.answer.value; 
        // value += answer;
        const speakOutput = 'How much sleep last night?';
        
        return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt('Sorry i did not get your answer.')
        .getResponse();

    }
};

// const QuestionThreeIntentHandler = {
//     canHandle(handlerInput) {
//       return handlerInput.requestEnvelope.request.type === 'IntentRequest'
//             && handlerInput.requestEnvelope.request.intent.name === 'Question3IntentHandler';
//     },
//     async handle(handlerInput) {
//         var i = 0;
//         const answer = handlerInput.requestEnvelope.request.intent.slots.answer.value; 
        
//         const questions = ['1', '2', '3', '4', '5', '6'];
//         const speakOutput = questions[i];
        
//         if(i > 4) {
//             return handlerInput.responseBuilder
//             .speak(speakOutput)
//             //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
//             .getResponse();
//         } else {
//             return handlerInput.responseBuilder
//             .speak(speakOutput)
//             .reprompt(questions[i])
//             .getResponse();
//         }
//         i += 1;
//     }
// };

// const QuestionFourIntentHandler = {
//     canHandle(handlerInput) {
//       return handlerInput.requestEnvelope.request.type === 'IntentRequest'
//             && handlerInput.requestEnvelope.request.intent.name === 'Question4IntentHandler';
//     },
//     async handle(handlerInput) {
//         var i = 0;
//         const answer = handlerInput.requestEnvelope.request.intent.slots.answer.value; 
        
//         const questions = ['1', '2', '3', '4', '5', '6'];
//         const speakOutput = questions[i];
        
//         if(i > 4) {
//             return handlerInput.responseBuilder
//             .speak(speakOutput)
//             //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
//             .getResponse();
//         } else {
//             return handlerInput.responseBuilder
//             .speak(speakOutput)
//             .reprompt(questions[i])
//             .getResponse();
//         }
//         i += 1;
//     }
// };

// const QuestionFiveIntentHandler = {
//     canHandle(handlerInput) {
//       return handlerInput.requestEnvelope.request.type === 'IntentRequest'
//             && handlerInput.requestEnvelope.request.intent.name === 'Question5IntentHandler';
//     },
//     async handle(handlerInput) {
//         var i = 0;
//         const answer = handlerInput.requestEnvelope.request.intent.slots.answer.value; 
        
//         const questions = ['1', '2', '3', '4', '5', '6'];
//         const speakOutput = questions[i];
        
//         if(i > 4) {
//             return handlerInput.responseBuilder
//             .speak(speakOutput)
//             //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
//             .getResponse();
//         } else {
//             return handlerInput.responseBuilder
//             .speak(speakOutput)
//             .reprompt(questions[i])
//             .getResponse();
//         }
//         i += 1;
//     }
// };

const FinalIntentHandler = {
    canHandle(handlerInput) {
       return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'FinalIntent';
    },
    async handle(handlerInput) {
        const answer = handlerInput.requestEnvelope.request.intent.slots.answer.value; 
        value += answer;
        const speakOutput = `Your value is ${value}.`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            // .reprompt('Sorry i did not get your answer.')
            .getResponse();
    }
};


const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.stack}`);
        const speakOutput = `Sorry, I had trouble doing what you asked. Please try again.`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const LoadBirthdayInterceptor = {    
    async process(handlerInput) {        
        const attributesManager = handlerInput.attributesManager;        
        const sessionAttributes = await attributesManager.getPersistentAttributes() || {};
        
        const name = sessionAttributes.hasOwnProperty('name') ? sessionAttributes.name : 0;
        if (name) {            
            attributesManager.setSessionAttributes(sessionAttributes);        
            
        }    
        
    } 
    
};
// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .withApiClient(new Alexa.DefaultApiClient())

    .withPersistenceAdapter( 
    new persistenceAdapter.S3PersistenceAdapter({bucketName:process.env.S3_PERSISTENCE_BUCKET}) 
    )
    .addRequestHandlers(
        CaptureBirthdayIntentHandler,
        HasBirthdayLaunchRequestHandler,
        QuestionOneIntentHandler,
        QuestionTwoIntentHandler,
        YesIntentHandler,
        FinalIntentHandler,
        LaunchRequestHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler) // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    .addRequestInterceptors(    
            LoadBirthdayInterceptor 
    )
    
    .addErrorHandlers(
        ErrorHandler,
    )
    .lambda();
