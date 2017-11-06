function Instance(log, options = {}){
    this.level = log.level
    this.systemId = log.systemId
    this.instanceId = log.instanceId
    this.state = log.actionId
    this.timestamp = log.timestamp
    this.regex = options.regex
    this.finalStateRegex = options.finalStateRegex


}

Instance.prototype.updateState = function(newAction){
    this.state += newAction;
    console.log(this.toString())
    return this.regex.test(this.state);
}

Instance.prototype.stateIsLegal = function(){
    console.log(this.toString())
    return this.regex.test(this.state);
}

Instance.prototype.toString = function(){
    return `${this.instanceId}: ${this.state}`
}

Instance.prototype.matchFinalState = function(){
    return this.finalStateRegex.test(this.state)
}

module.exports = Instance