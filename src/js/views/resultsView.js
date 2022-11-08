import previewView from "./previewView";

class ResultsView extends previewView {
  _parentElement = document.querySelector(".results");
  _alertMessage = "No recipe found. Please try another one!";
}

export default new ResultsView();
