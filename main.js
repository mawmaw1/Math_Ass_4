const readline = require('readline');
const Instance = require('./instance')

const rl = readline.createInterface({
  input: require('fs').createReadStream('logs.txt'),
});

let instances = {}

let regex = /(^A$)|(^A(B[C|D]*X?)$)/;
let finalStateRegex = /^AB[C|D]*X$/

rl.on('line', line => {
    let [level, systemId, instanceId, actionId, timestamp] = line.split(',')
    let log = { level, systemId, instanceId, actionId, timestamp }
    const instance = instances[instanceId]
    if(!instance){
        instances[instanceId] = new Instance(log, {regex, finalStateRegex})
        console.log('isLegal: ', instances[instanceId].stateIsLegal())
    }else{
        const isLegal = instance.updateState(log.actionId);
        console.log('isLegal: ', isLegal)
    }
})

rl.on('close', _ => {
    endAllInstances()
})

function endAllInstances(){
    _each(instances, instanceId => {
        endInstance(instanceId)
    })
}

function _each(obj, func){
    for(let key in obj){
        if(obj.hasOwnProperty(key)){
            func(key, obj[key])
        }
    }
}

function endInstance(instanceId){
    const instance = instances[instanceId]
    console.log(instance.instanceId + ' - Final state er bra: ' + instance.matchFinalState())
}

function isNull(val){
    return val === null || val === undefined
}

