(function(){

  angular.module('app.judgment').factory('editorService', editorService);

  editorService.$inject = ['$http', 'URL', 'validate', '$window'];

  function editorService($http, URL, validate, $window) {
    return {
      getJudgmentTemplate: getJudgmentTemplate,
      saveJudgmentTemplate: saveJudgmentTemplate,
      exportJudgmentDoc: exportJudgmentDoc,
      matchJudgment: matchJudgment,
      fetchLawItem: fetchLawItem
    }
    // Get Judgment Content
    function getJudgmentTemplate(params) {
      return $http.get(
        URL + '/verdict/template', { params: params }
      )
      .then(function(result) {
        if(validate(result.data, 200)){
          return result.data;
        }
      })
    };
    // Save Judgment Content
    function saveJudgmentTemplate(data) {
      return $http.post(
        URL + '/verdict/writ', data
      )
      .then(function(result) {
        if(validate(result.data, 200)){
          return result.data;
        }
      })
    };
    // Export Judgment Document
    function exportJudgmentDoc(data) {
      return $http.post(
        URL + '/verdict/export/word', data
      )
      .then(function(result) {
        if(validate(result.data, 200)){
          console.log(result.data.body[0].downloadUrl);
          $window.open(URL + '/' + result.data.body[0].downloadUrl);
        }
      })
    };
    // Match all Judgment
    function matchJudgment(target, part) {
      switch(part) {
        case 'factResult':
        return $http.post(
          URL + '/verdict/fact/result', { articleContent: target }
        ).then(function(result){
          if(validate(result.data, 200)){
            return result.data;
          }
        }); break;
        case 'reason':
        return $http.post(
          URL + '/verdict/reason', { articleContent: target }
        ).then(function(result){
          if(validate(result.data, 200)){
            return result.data;
          }
        }); break;
        case 'caseMain':
        return $http.post(
          URL + '/verdict/case/main', { articleContent: target }
        ).then(function(result){
          if(validate(result.data, 200)){
            return result.data;
          }
        }); break;
      }
    };
    // Fetch Low Item
    function fetchLawItem(params) {
      return $http.get(
        URL + '/case/brief/find/laws', { params: params }
      )
      .then(function(result){
        if(validate(result.data, 200)){
          return result.data;
        }
      })
    };

  };


})();
