(function(){

  angular.module('app.judgment').factory('editorService', editorService);

  editorService.$inject = ['$http', 'URL', 'validate', '$window'];

  function editorService($http, URL, validate, $window) {
    return {
      getJudgmentTemplate: getJudgmentTemplate,
      saveJudgmentTemplate: saveJudgmentTemplate,
      exportWORD: exportWORD,
      matchTemplateTree: matchTemplateTree,
      matchTemplateTreeInfo: matchTemplateTreeInfo,
      updateTemplateTreeInfo: updateTemplateTreeInfo,
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
    // Export Judgment by WORD
    function exportWORD(data) {
      var converted = htmlDocx.asBlob(data.articleHtml);
      window.saveAs(converted, data.lawCaseName+'.docx');
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
    // Match all Judgment
    function matchTemplateTree(target) {
      return $http.get(
        URL + '/conditon/tree'
      ).then(function(result){
        if(validate(result.data, 200)){
          return result.data;
        }
      });
    };
    function matchTemplateTreeInfo(params) {
      return $http.get(
        URL + '/conditon/tree/info', { params: params }
      ).then(function(result){
        if(validate(result.data, 200)){
          return result.data;
        }
      });
    };
    function updateTemplateTreeInfo(data) {
      return $http.put(
        URL + '/conditon/tree/info', data
      ).then(function(result){
        if(validate(result.data, 200)){
          return result.data;
        }
      });
    };

  };


})();
