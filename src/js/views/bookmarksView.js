import previewView from "./previewView";

class BookmarksView extends previewView {
  _parentElement = document.querySelector(".bookmarks__list");
  _alertMessage = "No bookmarks yet. Find a nice recipe and bookmark it :)";

  addHandlerStoreBookmark(handler) {
    window.addEventListener("load", handler);
  }
}

export default new BookmarksView();
