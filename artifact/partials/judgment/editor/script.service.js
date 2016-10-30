(function(){

  angular.module('app.judgment').factory('editorService', editorService);

  editorService.$inject = ['$http', 'URL', 'validate', '$window'];

  function editorService($http, URL, validate, $window) {
    return {
      Template: {
        fetch: template().fetch
      },
      Judgment: {
        save: judgment().save,
        history: judgment().history
      },
      Operation: {
        exportWORD: operation().exportWORD,
        autoComplete: operation().autoComplete
      },
      ReasonTree: {
        fetch: reasonTree().fetch,
        match: reasonTree().match,
        update: reasonTree().update
      },
      MainCaseTree: {
        fetch: mainCaseTree().fetch,
        serialNumber: mainCaseTree().serialNumber
      },
      LawItem: {
        fetch: lawItem().fetch
      },
      SimilarCase: {
        fetch: similarCase().fetch
      }
    };

    function template(){
      return {
        fetch: function(params) {
          return $http.get(
            URL + '/verdict/template', { params: params }
          ).then(function(result) {
            if(validate(result.data, 200)){
              return result.data;
            }
          })
        }
      }
    };

    function judgment() {
      return {
        save: function(data) {
          return $http.post(
            URL + '/verdict/writ', data
          ).then(function(result) {
            if(validate(result.data, 200)){
              return result.data;
            }
          })
        },
        history: function(params) {
          return $http.get(
            URL + '/verdict/update/log', { params: params }
          ).then(function(result){
            if(validate(result.data, 200)){
              return result.data;
            }
          })
        }
      }
    };

    function operation() {
      return {
        exportWORD: function(data) {
          var converted = htmlDocx.asBlob(data.articleHtml);
          window.saveAs(converted, data.lawCaseName+'.docx');
        },
        autoComplete: function(params){
          return $http.get(
            URL + '/verdict/auto/fill', {params: params}
          ).then(function(result) {
            if(validate(result.data, 200)){
              return result.data;
            }
          })
        }
      }
    };

    function lawItem(){
      return {
        fetch: function(params) {
          return $http.get(
            URL + '/case/brief/find/laws', { params: params }
          ).then(function(result){
            if(validate(result.data, 200)){
              return result.data;
            }
          })
        }
      }
    };

    function similarCase() {
      return {
        fetch: function(data) {
          return $http.post(
            URL + '/case/similar/verdict', { articleContent: data }
          ).then(function(result){
            if(validate(result.data, 200)){
              return result.data;
            }
          })
        }
      }
    };

    function reasonTree() {
      return {
        fetch: function(target) {
          return $http.get(
            URL + '/conditon/tree'
          ).then(function(result){
            if(validate(result.data, 200)){
              return result.data;
            }
          });
        },
        match: function(params) {
          return $http.get(
            URL + '/conditon/tree/info', { params: params }
          ).then(function(result){
            if(validate(result.data, 200)){
              return result.data;
            }
          });
        },
        update: function(data) {
          return $http.put(
            URL + '/conditon/tree/info', data
          ).then(function(result){
            if(validate(result.data, 200)){
              return result.data;
            }
          });
        }
      }
    };

    function mainCaseTree() {
      return {
        fetch: function() {
          return $http.get(
            URL + '/case/main'
          ).then(function(result){
            return result.data;
          });
        },
        serialNumber: function(number) {
          return [
            "一","二","三","四","五","六","七","八","九","十","十一","十二","十三","十四","十五","十六","十七","十八","十九","二十","二十一","二十二","二十三","二十四","二十五","二十六","二十七","二十八","二十九","三十","三十一","三十二"
          ][number-1];
        }
      }
    }

  };

})();
