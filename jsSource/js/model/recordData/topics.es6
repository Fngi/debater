import {file} from 'model/recordData/file';

let dataRef;

export const topics = {
  get() {
    return dataRef;
  },
  load() {
    dataRef = [];
    const loadDeferred = new $.Deferred();
    const waiting = [];
    waiting.push(file.load());
    $('#topics').html(`<li data-topic="" data-expandable="all" class="active" data-summary=""><a>All Topics <span class="badge badge-light"></span><span class="glyphicon-light glyphicon glyphicon-folder-open"></span></a></li>`);
    $.when.apply($.when, waiting).done(() => {
      const description = file.get('description');
      $('#topics [data-topic=""]').attr('data-summary', description);
      const topics = file.get('topics');
      Object.keys(topics).forEach((topicName) => {
        const topic = new Topic( topics[topicName].count, topics[topicName].name, topics[topicName].parent, topics[topicName].order, topics[topicName].summary);
        dataRef.push(topic.toHTML());
      });
      loadDeferred.resolve(dataRef);
    });
    return loadDeferred;
  }
};

class Topic {
  constructor(count,name,parent,order,summary) {
    this._name = name;
    this._count = count;
    this._parent = parent || '';
    this._order = order || '';
    this._summary = summary || '';
    return this;
  }
  toHTML() {
    let badge = '';
    if (this._count == 0) {
      badge = '';
    } else {
      badge = `<span class='badge badge-light'>${this._count}</span>`;
    }
    let expandable = false;
    let expandicon = '';
    if (this._parent == '') {
      expandable = true;
      expandicon = `<span class='glyphicon-light glyphicon glyphicon-folder-open'></span>`;
    }
    return `
      <li class='topic' data-expandable='${expandable}' data-order='${this._order}' data-topic='${this._name}' data-parent='${this._parent}' data-count='${this._count}' data-summary='${this._summary}'>
        <a>${this._name} 
          ${badge}
          ${expandicon}
        </a>
      </li>`;
  }
}