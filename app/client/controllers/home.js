/**
* Created with DemandWareLogExplorer.
* User: bombadillo
* Date: 2014-12-08
* Time: 04:03 PM
* To change this template use Tools | Templates.
*/
(function() {
    
    var app = angular.module('DemandWareLogExplorer');
    
    app.controller('HomeController', HomeController);
    
    function HomeController($http) {
        var vm = this;
        vm.logIndexes = ['date', 'type', 'message'];
        vm.itemTypeLabels = {'INFO' : 'info', 'ERROR': 'danger', 'DEBUG': 'warning'};        
        vm.title = 'Log Explorer';     
        vm.currentPage = 0;
        vm.pageSize = 40;  
        vm.errors = false;
        
        vm.splitData = splitData;
        vm.changeLogData = changeLogData;
        
        vm.onPrevClick = onPrevClick;
        vm.onNextClick = onNextClick;
        vm.filterLog = showAllLogItems();
        vm.changeLogFilter = changeLogFilter;
        vm.scrollToTop = scrollToTop;
            
    }
    
    function splitData(vm) {

        var data = $('#data').val();
        vm.errors = false;
        
        if (data === '') {
            vm.errorMessage = 'No data was input';
            vm.errors = true;
        }
        
        var lines = data.split('\n');
                
        vm.logItems = [];
        
        for(var i in lines) {
            var line = lines[i];
            var splitLine = line.split('] ');
            
            logObj = removeUnnecessaryData(splitLine, vm);
            if (logObj.message) vm.logItems.push(logObj);            
        }  
        
        if (vm.logItems.length < 1) {
            vm.errors = true;
            vm.errorMessage = 'No log data was produced from the input';
        }
                
        vm.numberOfPages = function() {
            return Math.ceil(vm.logItems.length / vm.pageSize);
        }       
        
        $('.changeData').slideDown();
        $('.input-data').slideUp();
        $('.changePage').fadeIn();
        $('.log-items').slideDown();
        $('.pageInfo').fadeIn();
        
    }
    
    function changeLogData() {
        $('#data').val('');
        $('.input-data').slideDown();
        $('.changeData').slideUp();
        $('.changePage').fadeOut();
        $('.log-items').slideUp();
        $('.pageInfo').fadeOut();
    }
    
    function removeUnnecessaryData(splitLine, vm) {
        var splitObj = {};
        
        for (var i in splitLine) {            
            
            if (i == 0) {
                var sDate = splitLine[i].replace(/\[/, '')
                sDate = splitLine[i].substring(0, splitLine[i].length - 7);
                var date = new Date();       
                splitObj[vm.logIndexes[i]] = date.toLocaleString();
            }
            else if (i == 1)
            {
                splitObj[vm.logIndexes[i]] = splitLine[i].replace('[', '');
            }     
            else 
            {
                var addJson = getMessageObjects(splitLine[i]);     
                splitObj[vm.logIndexes[i]] = addJson;
            }
        }        

        return splitObj;
    }
    
    function getMessageObjects(splitLine) {

        var pattArray  = /\{|(.*?)\}/g;
        var pattObject = /\[|(.*?)\]/g;
        var pattSql    = 'SQL:'
        var pattXml    = /<\?xml/; 
        var containsArray = splitLine.match(pattArray);
        var containsObject = splitLine.match(pattObject);
        var containsSql = splitLine.match(pattSql);
        var containsXml = splitLine.match(pattXml);
        var responseObj = { message: splitLine };          
        
        if (containsXml) {
            
        } else if (containsArray) {
            var json = parseAsJsonArray(splitLine);
            if (json) responseObj = json;
        } else if (containsObject) {
            var json = parseAsJsonObject(splitLine);
            if (json) responseObj = json;
        } else if(containsSql) {
            responseObj = { json: splitLine }
        }
        
        return responseObj;
    }
    
    function parseAsJsonArray(splitLine) {
        var startOfJson = splitLine.indexOf('[');           
        var jsonString = splitLine.substr(startOfJson, splitLine.length - 1);           
        var message = splitLine.substr(0, startOfJson - 1);
        var responseObj = { message: message };
        
        if (jsonString !== '') {
            responseObj.json = JSON.parse(jsonString); 
            return responseObj;
        }
        
        return false;
    }    
    
    function parseAsJsonObject(splitLine) {
        var startOfJson = splitLine.indexOf('{');           
        var jsonString = splitLine.substr(startOfJson, splitLine.length - 1);  
        var message = splitLine.substr(0, startOfJson - 1);
        var responseObj = { message: message };       
        
        if (jsonString !== '' && jsonString.trim() !== ']') {
            responseObj.json = JSON.parse(jsonString); 
            return responseObj;
        }
        
        return false;
    }
    
    function parseAsXml(splitLine) {
        var startOfXml = splitLine.indexOf('<?xml');
        var xmlString = splitLine.substr(startOfXml, splitLine.length -1);
        var message = splitLine.substr(0, startOfXml - 1);
        var responseObj = { message: message };
        
        if (xmlString !== '' && xmlString.trim() !== ']') {
            responseObj.json = xmlString;
            return responseObj;
        }
        
        return false;
    }
    
    function onPrevClick(vm) {
        vm.currentPage = vm.currentPage - 1;
        scrollToTop();
    }
    
    function onNextClick(vm) {
        vm.currentPage = vm.currentPage + 1;
        scrollToTop();
    }    
    
    function scrollToTop() {
        $("html, body").animate({ scrollTop: 0 }, "fast");
    }
    
    function showAllLogItems() {
        return { };
    }
    
    function showErrorLogItems() {        
        return { type: 'ERROR' };
    }
    
    function showInfoLogItems() {
        return { type: 'INFO' };
    }
    
    function showDebugLogItems() {
        return { type: 'DEBUG' };
    }
    
    function changeLogFilter(vm, type) {
        
        switch (type) {
            case 'ERROR':
                vm.filterLog = showErrorLogItems();
                break;
            case 'INFO':
                vm.filterLog = showInfoLogItems();
                break;
            case 'DEBUG': 
                vm.filterLog = showDebugLogItems();
                break;
            default:
                vm.filterLog = showAllLogItems();
                break;
        }
        
    }
    
    function scrollToTop() {        
        $("html, body").animate({ scrollTop: 0 }, "slow");
    }
    
        
    
})();