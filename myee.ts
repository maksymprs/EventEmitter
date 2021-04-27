type EventName = string;
type EventHandler = (event: EventBody) => void;
type EventBody = any;

class EventEmitter {
  private map = new Map<string, Array<EventHandler>>();
  
  on(eventName: EventName, handler: EventHandler): void {
    const arr = this.map.get(eventName);
    
    arr ? arr.push(handler) : this.map.set(eventName, [handler]);
  }

  emit(eventName: EventName, event: EventBody): void {
    const actions = this.map.get(eventName);

    actions ? actions.forEach(action => action (event)) : console.log('no event found');
  }
}

let ee = new EventEmitter();

ee.on('start', (msg) => {console.log(msg)});
ee.on('start', (msg) => {console.log("Second listener added " + msg)});
ee.on('start', (msg) => {console.log("Third listener added " + msg)});

ee.on('broadcast', (msg) => {console.log(msg)});

ee.emit('start', 'start test');
//ee.emit('brdcast', 'broadcast started');
ee.emit('broadcast', 'broadcast started');