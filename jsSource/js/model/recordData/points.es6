import {file} from 'model/recordData/file';

let dataRef;

export const points = {
  get() {
    return dataRef;
  },
  load() {
    $('#points').html('');
    const loadDeferred = new $.Deferred();
    const waiting = [];
    waiting.push(file.load());
    $.when.apply($.when, waiting).done(() => {
      dataRef = file.get('points').map((pointData) => {
        const point = new Point(pointData);
        return point.toHTML();
      });
      loadDeferred.resolve(dataRef);
    });
    return loadDeferred;
  }
};

class Point {
  constructor(data) {
    this._data = data;
    return this;
  }
  toHTML() {
    let topics = this._data.topics || [];
    topics = topics.map((topic) => {
      return `<span class='badge badge-light' data-topic='${topic}'>${topic}</span>`;
    }).join("");
    let relations = this._data.relations || [];
    relations = relations.map((relation) => {
      return `<span data-relation='${relation}'></span>`;
    }).join("");
    let professions = this._data.professions || [];
    professions = professions.map((profession) => {
      return `<span data-profession='${profession}'></span>`;
    }).join("");
    return `
      <blockquote class='point' data-timestamp="${this._data.timestamp}" cite="${this._data.url}">
        <p>${this._data.content}</p>
        <p class="align-right clear">
          ${topics}
        </p>
        <div class="align-right small">
          <a href="${this._data.url}" target="_blank">${this._data.timestamp}</a>
        </div>
        <div class="align-right clear">
          ${relations}
          ${professions}
        </div>
        <div class="author"><a data-author="${this._data.author}">${this._data.author}</a></div>
      </blockquote>
    `;

  }
}