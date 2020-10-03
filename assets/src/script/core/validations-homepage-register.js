/* Translation */
const translateObject = {

    'tr': {
        'LPRegisterFirstNameAlert':'EN AZ 2 KARAKTER',
        'LPRegisterLastNameAlert':'EN AZ 2 KARAKTER',
        'LPRegisterPhoneAlert':'HATALI TELEFON',
        'LPRegisterEmailAlert':'HATALI E-POSTA',
        'LPRegisterUseTermCheck':'İŞARETLE'
    },
    'en':{
        'LPRegisterFirstNameAlert':'EN AZ 2 KARAKTER',
        'LPRegisterLastNameAlert':'EN AZ 2 KARAKTER',
        'LPRegisterPhoneAlert':'HATALI TELEFON',
        'LPRegisterEmailAlert':'HATALI E-POSTA',
        'LPRegisterUseTermCheck':'İŞARETLE'
    }
};

class Translation {
    static translate(language, translationKey){
        if(translateObject.hasOwnProperty(language)){

            if(translateObject[language].hasOwnProperty(translationKey)){
                return translateObject[language][translationKey];
            }
            return "";
        }
        return "";
    }
}
/* Translation */

/* LP Register Form */
class LPRegisterForm {

    constructor(){}

    sendLPRegisterForm(){}

    setLPRegisterFormErrorMessages(inputIdSelector, inputErrorMessage){
        let ErrorMessageText = document.getElementById(inputIdSelector);
        ErrorMessageText.innerHTML = inputErrorMessage;
    }
    setLPRegisterFormErrorInput(inputIdSelector){
        let ErrorInputClass = document.getElementById(inputIdSelector);
    }
    setLPRegisterFormErrorIcon(inputIdSelector, inputAddErrorIcon, inputRemoveErrorIcon){
        let ErrorIconClass = document.getElementById(inputIdSelector);
        ErrorIconClass.classList.add(inputAddErrorIcon);
        ErrorIconClass.classList.remove(inputRemoveErrorIcon);
    }

    verifyContent(inputProcessName, inputIdSelector, messageSpanSelector, messageIconSelector){

        let phonePatternGsm = /^\(5\d{2}\)\s?\d{3}\s?\d{2}\s?\d{2}$/g; // GSM Phone Pattern
        let phonePatternAll = /^\(\d{3}\)\s?\d{3}\s?\d{2}\s?\d{2}$/g; // ALL Phone Pattern
        let emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;

        let inputSelectorTag = document.getElementById(inputIdSelector);
        let messageSpanSelectorTag = document.getElementById(messageSpanSelector);
        let messageIconSelectorTag = document.getElementById(messageIconSelector);

        let val = inputSelectorTag.value.trim();
        let checkbox = inputSelectorTag;

        switch (inputProcessName) {

            case "inputFirstNameProcess":
                if(val.length < 2){
                    this.setLPRegisterFormErrorMessages(messageSpanSelector, Translation.translate('tr','LPRegisterFirstNameAlert'));
                    this.setLPRegisterFormErrorIcon(messageIconSelector,"error", "check");
                    this.setLPRegisterFormErrorInput(inputIdSelector);
                }else{
                    this.setLPRegisterFormErrorMessages(messageSpanSelector,"");
                    this.setLPRegisterFormErrorIcon(messageIconSelector,"check", "error");
                    this.setLPRegisterFormErrorInput(inputIdSelector);
                }
                break;

            case "inputLastNameProcess":
                if(val.length < 2){
                    this.setLPRegisterFormErrorMessages(messageSpanSelector, Translation.translate('tr','LPRegisterLastNameAlert'));
                    this.setLPRegisterFormErrorIcon(messageIconSelector,"error", "check");
                    this.setLPRegisterFormErrorInput(inputIdSelector);
                }else{
                    this.setLPRegisterFormErrorMessages(messageSpanSelector,"");
                    this.setLPRegisterFormErrorIcon(messageIconSelector,"check", "error");
                    this.setLPRegisterFormErrorInput(inputIdSelector);
                }
                break;

            case "inputPhoneProcess":
                if(val.replace(/\s/g, "").length < 11){
                    this.setLPRegisterFormErrorMessages(messageSpanSelector, Translation.translate('tr','LPRegisterPhoneAlert'));
                    this.setLPRegisterFormErrorIcon(messageIconSelector,"error", "check");
                    this.setLPRegisterFormErrorInput(inputIdSelector);
                }else{
                    this.setLPRegisterFormErrorMessages(messageSpanSelector,"");
                    this.setLPRegisterFormErrorIcon(messageIconSelector,"check", "error");
                    this.setLPRegisterFormErrorInput(inputIdSelector);
                }
                break;

            case "inputEmailProcess":
                if(!emailPattern.test(val)){
                    this.setLPRegisterFormErrorMessages(messageSpanSelector, Translation.translate('tr','LPRegisterEmailAlert'));
                    this.setLPRegisterFormErrorIcon(messageIconSelector,"error", "check");
                    this.setLPRegisterFormErrorInput(inputIdSelector);
                }else{
                    this.setLPRegisterFormErrorMessages(messageSpanSelector,"");
                    this.setLPRegisterFormErrorIcon(messageIconSelector,"check", "error");
                    this.setLPRegisterFormErrorInput(inputIdSelector);
                }
                break;
        }
    }

    verifyContentErrorDelete(inputProcessName, inputIdSelector, messageSpanSelector, messageIconSelector){

        let inputSelectorTag = document.getElementById(inputIdSelector);
        let messageSpanSelectorTag = document.getElementById(messageSpanSelector);
        let messageIconSelectorTag = document.getElementById(messageIconSelector);
        let val = inputSelectorTag.value.trim();
        let checkbox = inputSelectorTag;

        switch (inputProcessName) {

            case "inputFirstNameProcess":
                if(val.length===0){
                    this.setLPRegisterFormErrorMessages(messageSpanSelector, Translation.translate('tr','LPRegisterFirstNameAlert'));
                    this.setLPRegisterFormErrorIcon(messageIconSelector,"error", "check");
                    this.setLPRegisterFormErrorInput(inputIdSelector);
                }
                break;

            case "inputLastNameProcess":
                if(val.length===0){
                    this.setLPRegisterFormErrorMessages(messageSpanSelector, Translation.translate('tr','LPRegisterLastNameAlert'));
                    this.setLPRegisterFormErrorIcon(messageIconSelector,"error","check");
                    this.setLPRegisterFormErrorInput(inputIdSelector);
                }
                break;

            case "inputPhoneProcess":
                if(val.length===0){
                    this.setLPRegisterFormErrorMessages(messageSpanSelector, Translation.translate('tr','LPRegisterPhoneAlert'));
                    this.setLPRegisterFormErrorIcon(messageIconSelector,"error","check");
                    this.setLPRegisterFormErrorInput(inputIdSelector);
                }
                break;

            case "inputEmailProcess":
                if(val.length===0){
                    this.setLPRegisterFormErrorMessages(messageSpanSelector, Translation.translate('tr','LPRegisterEmailAlert'));
                    this.setLPRegisterFormErrorIcon(messageIconSelector,"error","check");
                    this.setLPRegisterFormErrorInput(inputIdSelector);
                }
                break;
        }
    }
}

window.lpregisterform = new LPRegisterForm();
/* LP Register Form */

/* Loading Info */
// console.log("LP Register Form Validations Javascript Loading Successful");
/* Loading Info */