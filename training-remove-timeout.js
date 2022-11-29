// ==UserScript==
// @name         跳过培训超时对话框
// @version      0.3
// @description  培训对话框会影响学习的连贯性，影响学习效率，影响学习质量
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
            ele.bind("DOMNodeInserted", function (em) {
                const modal = $(em.target)
                if (modal.attr("class") != undefined && (modal.attr("class").indexOf("ant-modal-confirm") > -1 || modal.attr("class").indexOf("ant-modal-root") > -1)) {
                    if (modal.html().indexOf("您已经5分钟未操作") > -1) {
                        window.setTimeout(function () {
                            modal.find("button.ant-btn-primary").trigger("click")
                        }, 1000)
                    }
                    if (modal.html().indexOf("练习题") > -1) {
                        window.setTimeout(function () {
                            modal.find("button[aria-label='Close']").trigger("click")
                        }, 1000)
                    }
                }
            })
        }
    })
})();
