// ==UserScript==
// @name         跳过培训超时对话框
// @version      0.6
// @description  培训对话框会影响学习的连贯性，影响学习效率，影响学习质量
// @author       NiaoBlush
// @match        tp.1safety.cc/student
// @match        tp.1safety.cc/student/study/*
// @match        tp.1safety.cc/student/train
// @icon         https://www.google.com/s2/favicons?sz=64&domain=1safety.cc
// @require      https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.min.js
// @grant        GM_addStyle
// @namespace https://greasyfork.org/users/440597
// @downloadURL https://update.greasyfork.org/scripts/455517/%E8%B7%B3%E8%BF%87%E5%9F%B9%E8%AE%AD%E8%B6%85%E6%97%B6%E5%AF%B9%E8%AF%9D%E6%A1%86.user.js
// @updateURL https://update.greasyfork.org/scripts/455517/%E8%B7%B3%E8%BF%87%E5%9F%B9%E8%AE%AD%E8%B6%85%E6%97%B6%E5%AF%B9%E8%AF%9D%E6%A1%86.meta.js
// ==/UserScript==

(function () {
    "use strict";
    console.log("loaded");
    console.log($.fn.jquery);

    GM_addStyle(`
    #rm-timeout_overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(217, 0, 0, 0.3);
      z-index: 9999;
    }
    `);

    // 使用 MutationObserver 监测 DOM 变化
    const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.addedNodes.length) {
                mutation.addedNodes.forEach(function (node) {
                    const ele = $(node);

                    if (ele.prop("outerHTML") === "<div></div>") {
                        console.log("__ empty div inserted");

                        // 继续监测此 div 的内容变化
                        const modalObserver = new MutationObserver(function (modalMutations) {
                            modalMutations.forEach(function (modalMutation) {
                                modalMutation.addedNodes.forEach(function (modalNode) {
                                    const modal = $(modalNode);

                                    if (modal.attr("class") && (modal.hasClass("ant-modal-confirm") || modal.hasClass("ant-modal-root"))) {
                                        console.log("__ modal inserted");

                                        if (modal.html().indexOf("您已经5分钟未操作") > -1) {
                                            const overlay = document.createElement('div');
                                            overlay.id = 'rm-timeout_overlay';
                                            document.body.appendChild(overlay);

                                            window.setTimeout(function () {
                                                document.body.removeChild(overlay);
                                                modal.find("button.ant-btn-primary").trigger("click");
                                                console.log("__ triggered");
                                            }, 4000);
                                        }

                                        if (modal.html().indexOf("练习题") > -1) {
                                            window.setTimeout(function () {
                                                modal.find("button[aria-label='Close']").trigger("click");
                                                console.log("__ triggered");
                                            }, 1000);
                                        }
                                    }
                                });
                            });
                        });

                        modalObserver.observe(node, {childList: true, subtree: true});
                    }
                });
            }
        });
    });

    // 开始监测 body 的变化
    observer.observe(document.body, {childList: true, subtree: true});

})();
