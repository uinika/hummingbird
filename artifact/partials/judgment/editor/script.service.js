(function(){

  angular.module('app.judgment').factory('editorService', editorService);

  editorService.$inject = ['$http', 'URL', 'validate', '$window'];

  function editorService($http, URL, validate, $window) {
    return {
      Template: {
        fetch: new Template().fetch
      },
      Judgment: {
        save: new Judgment().save,
        history: new Judgment().history
      },
      Operation: {
        exportWORD: new Operation().exportWORD,
        autoComplete: new Operation().autoComplete
      },
      TemplateTree: {
        fetch: new TemplateTree().fetch,
        match: new TemplateTree().match,
        update: new TemplateTree().update
      },
      LawItem: {
        fetch: new LawItem().fetch
      },
      SimilarCase: {
        fetch: new SimilarCase().fetch
      }
    };

    function Template(){
      this.fetch = function(params) {
        return $http.get(
          URL + '/verdict/template', { params: params }
        ).then(function(result) {
          if(validate(result.data, 200)){
            return result.data;
          }
        })
      };
    };

    function Judgment() {
      this.save = function(data) {
        return $http.post(
          URL + '/verdict/writ', data
        ).then(function(result) {
          if(validate(result.data, 200)){
            return result.data;
          }
        })
      };
      this.history = function(params) {
        return $http.get(
          URL + '/verdict/update/log', { params: params }
        ).then(function(result){
          if(validate(result.data, 200)){
            return result.data;
          }
        })
      };
    };

    function Operation() {
      this.exportWORD = function(data) {
        var converted = htmlDocx.asBlob(data.articleHtml);
        window.saveAs(converted, data.lawCaseName+'.docx');
      };
      this.autoComplete = function(params){
        return $http.get(
          URL + '/verdict/auto/fill', {params: params}
        ).then(function(result) {
          if(validate(result.data, 200)){
            return result.data;
          }
        })
      }
    };

    function LawItem(){
      this.fetch = function(params) {
        return $http.get(
          URL + '/case/brief/find/laws', { params: params }
        ).then(function(result){
          if(validate(result.data, 200)){
            return result.data;
          }
        })
      };
    };

    function SimilarCase() {
      this.fetch = function(data) {
        return $http.post(
          URL + '/case/similar/verdict', { articleContent: data }
        ).then(function(result){
          if(validate(result.data, 200)){
            return result.data;
          }
        })
      };
    };

    function TemplateTree() {
      this.fetch = function(target) {
        return $http.get(
          URL + '/conditon/tree'
        ).then(function(result){
          if(validate(result.data, 200)){
            return result.data;
          }
        });
      };
      this.match = function(params) {
        return $http.get(
          URL + '/conditon/tree/info', { params: params }
        ).then(function(result){
          if(validate(result.data, 200)){
            return result.data;
          }
        });
      };
      this.update = function(data) {
        return $http.put(
          URL + '/conditon/tree/info', data
        ).then(function(result){
          if(validate(result.data, 200)){
            return result.data;
          }
        });
      };
    };


  };


})();
