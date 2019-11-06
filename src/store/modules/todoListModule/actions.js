
import { jsListItemToFs, equalAllListItemProperties } from '@/util/listItemUtils';

function createItem({ commit }, newItem) {
  commit('insert', newItem);
}

function itemExists(state, itemId) {
  return Object.prototype.hasOwnProperty.call(state.data, itemId);
}

function updateItem({ commit, state }, updatedItem) {
  if (!itemExists(state, updatedItem.id)) {
    console.error('Attempt to update item that doesn\'t exists!');
    return;
  }
  const original = state.data[updatedItem.id];
  const fsItem = jsListItemToFs(updatedItem);
  if (!equalAllListItemProperties(fsItem, original)) {
    commit('patch', updatedItem);
  }
}

function deleteItem({ commit, state }, itemId) {
  if (!itemExists(state.data, itemId)) {
    console.error('Attempt to delete item that doesn\'t exists!');
    return;
  }
  commit('markAsDeleted', itemId);
}

export { createItem, updateItem, deleteItem };