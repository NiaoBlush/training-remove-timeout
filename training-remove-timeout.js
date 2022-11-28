// ==UserScript==
// @name         跳过培训超时对话框
// @version      0.2
// @description  培训对话框会影响学习的连贯性，影响学习效率
// @author       You
// @match        http://tp.1safety.cc/student
// @match        http://tp.1safety.cc/student/study/*
// @match        http://tp.1safety.cc/student/train
// @icon         https://www.google.com/s2/favicons?sz=64&domain=1safety.cc
// @require      https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.min.js
// @grant        none
// ==/UserScript==

(function () {
    "use strict";
    console.log("loaded")
    console.log($.fn.jquery)
    $("body").bind("DOMNodeInserted", function (e) {
        const ele = $(e.target)
        if (ele.prop("outerHTML") == "<div></div>") {
            //console.log("empty", ele)
            ele.bind("DOMNodeInserted", function (em) {
                const modal = $(em.target)
                //console.log("inserted", modal)
                if (modal.attr("class") != undefined && modal.attr("class").indexOf("ant-modal-confirm") > -1 && modal.html().indexOf("您已经5分钟未操作") > -1) {
                    console.log("检测到超时对话框");
                    window.setTimeout(function () {
                        console.log("点击继续")
                        modal.find("button.ant-btn-primary").trigger("click")
                    }, 1000)
                }
            })
        }
    })
})();
