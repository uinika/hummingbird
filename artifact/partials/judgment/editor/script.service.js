(function(){

  angular.module('app.judgment').factory('editorService', editorService);

  editorService.$inject = ['$http', 'URL', 'validate', '$window'];

  function editorService($http, URL, validate, $window) {
    return {
      getJudgmentTemplate: getJudgmentTemplate,
      saveJudgmentTemplate: saveJudgmentTemplate,
      exportJudgmentDoc: exportJudgmentDoc,
      matchByFactResult: matchByFactResult,
      matchByReasonTree: matchByReasonTree,
      matchByCaseMain: matchByCaseMain,
      fetchLawItem: fetchLawItem,
      fetchSimilarCase: fetchSimilarCase
    };
    // Get Judgment Content
    function getJudgmentTemplate(params) {
      return $http.get(
        URL + '/verdict/template', { params: params }
      ).then(function(result) {
        if(validate(result.data, 200)){
          return result.data;
        }
      })
    };
    // Save Judgment Content
    function saveJudgmentTemplate(data) {
      return $http.post(
        URL + '/verdict/writ', data
      ).then(function(result) {
        if(validate(result.data, 200)){
          return result.data;
        }
      })
    };
    // Export Judgment Document
    function exportJudgmentDoc(data) {
      return $http.post(
        URL + '/verdict/export/word', data
      ).then(function(result) {
        if(validate(result.data, 200)){
          console.log(result.data.body[0].downloadUrl);
          $window.open(URL + '/' + result.data.body[0].downloadUrl);
        }
      })
    };
    // Match all Judgment
    function matchByFactResult(target) {
      return $http.post(
        URL + '/verdict/fact/result', { articleContent: target }
      ).then(function(result){
        if(validate(result.data, 200)){
          return result.data;
        }
      });
    };
    function matchByCaseMain(target) {
      return $http.post(
        URL + '/verdict/case/main', { articleContent: target }
      ).then(function(result){
        if(validate(result.data, 200)){
          return result.data;
        }
      });
    };
    function matchByReasonTree(target) {
      return $http.get(
        URL + '/conditon/tree'
      ).then(function(result){
        if(validate(result.data, 200)){
          return result.data;
        }
      });
    };
    // Fetch Low Item
    function fetchLawItem(params) {
      return $http.get(
        URL + '/case/brief/find/laws', { params: params }
      ).then(function(result){
        if(validate(result.data, 200)){
          return result.data;
        }
      })
    };
    // Fetch Similar Case
    function fetchSimilarCase(data) {
      return $http.post(
        URL + '/case/similar/verdict', { articleContent: data }
      ).then(function(result){
        if(validate(result.data, 200)){
          return result.data;
        }
      })
    };

  };


})();
