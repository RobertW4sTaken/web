/*! button 2019-01-17 */

! function i(s, a, c) {
    function u(t, e) {
        if (!a[t]) {
            if (!s[t]) {
                var n = "function" == typeof require && require;
                if (!e && n) return n(t, !0);
                if (l) return l(t, !0);
                var r = new Error("Cannot find module '" + t + "'");
                throw r.code = "MODULE_NOT_FOUND", r
            }
            var o = a[t] = {
                exports: {}
            };
            s[t][0].call(o.exports, function(e) {
                return u(s[t][1][e] || e)
            }, o, o.exports, i, s, a, c)
        }
        return a[t].exports
    }
    for (var l = "function" == typeof require && require, e = 0; e < c.length; e++) u(c[e]);
    return u
}({
    1: [function(a, e, t) {
        "use strict";
        ! function() {
            if (-1 !== location.hostname.indexOf("glitch.me") || -1 !== location.hostname.indexOf("glitch.com")) {
                var e = a("axios"),
                    n = "//button.glitch.me",
                    r = "glitchButton",
                    c = "glitchOpenWindowElement",
                    t = location.hostname.split(".")[0],
                    o = document.createElement("link");
                o.rel = "stylesheet", o.href = "".concat(n, "/css/button.css"), document.head.appendChild(o);
                var i = document.getElementsByTagName("script");
                [].forEach.call(i, function(e) {
                    if (e.getAttribute("src") && -1 !== e.getAttribute("src").indexOf(n) && e.dataset.style) {
                        var t = document.createElement("link");
                        t.rel = "stylesheet", t.href = "".concat(n, "/css/").concat(e.dataset.style, ".css"), document.head.appendChild(t)
                    }
                });
                var s = function(e, t) {
                        for (;
                            (e = e.parentElement) && !(e.matches || e.matchesSelector).call(e, t););
                        return e
                    },
                    u = document.getElementsByClassName(r),
                    l = function(e) {
                        var t = s(e.target, "." + r).getElementsByClassName(c)[0];
                        t.style.display = "none" === t.style.display ? "block" : "none"
                    };
                window.onkeyup = function(e) {
                    9 !== e.keyCode || s(document.activeElement, "." + r) || [].forEach.call(document.getElementsByClassName(c), function(e) {
                        e.style.display = "none"
                    })
                }, window.onclick = function(e) {
                    if (!s(e.target, "." + r)) {
                        var t = document.getElementsByClassName(c);
                        [].forEach.call(t, function(e) {
                            e.style.display = "none"
                        })
                    }
                }, e.get("https://api.glitch.com/projects/" + t).then(function(e) {
                    var t = e.data;
                    if (!t) return null;
                    var n = t.domain,
                        r = t.description,
                        o = t.users.map(function(e) {
                            return e.login ? '<li><a href="'.concat("//glitch.com/@").concat(e.login, "?utm_source=").concat(n, '&utm_medium=button&utm_campaign=glitchButton"><img width="25px" src="').concat(e.avatarUrl, '" alt="avatar of ').concat(e.login, '" />\n                    <span class="name">').concat(e.login, "</span></a></li>") : null
                        }),
                        i = '',
                        s = '<a class="buttonLinks viewCode" href="https://glitch.com/edit/#!/'.concat(n, "?utm_source=").concat(n, '&utm_medium=button&utm_campaign=glitchButton">View Source</a>'),
                        a = '<div class="project">\n          <div class="name">'.concat(n, '</div>\n          <p class="description">').concat(r, '</p>\n          <div class="users">\n            <ul>').concat(o.join(" "), '</ul>\n          </div>\n          <div class="footer">').concat(i, " ").concat(s, "</div>\n        </div>");
                    [].forEach.call(u, function(e) {
                        var t = document.createElement("button");
                        t.className = "glitchButtonElement", t.innerHTML = '<img alt="This is a Glitch app!" width="50px" src="'.concat("https://cdn.glitch.com/3fd2e3a7-3145-4c1d-9480-32a2e6a6963a%2Flogo-day.svg?1490800908258", '" />');
                        var n = document.createElement("div");
                        n.className = c, n.style.display = "none", n.innerHTML = "".concat(a, ' <span class="tooltip border"></span><span class="tooltip fill"></span>'), t.onclick = l, e.appendChild(t), e.appendChild(n)
                    })
                }).catch(function(e) {
                    console.log(e)
                })
            }
        }()
    }, {
        axios: 2
    }],
    2: [function(e, t, n) {
        t.exports = e("./lib/axios")
    }, {
        "./lib/axios": 4
    }],
    3: [function(x, e, t) {
        (function(p) {
            "use strict";
            var d = x("./../utils"),
                h = x("./../core/settle"),
                m = x("./../helpers/buildURL"),
                g = x("./../helpers/parseHeaders"),
                y = x("./../helpers/isURLSameOrigin"),
                v = x("../core/createError"),
                w = "undefined" != typeof window && window.btoa && window.btoa.bind(window) || x("./../helpers/btoa");
            e.exports = function(f) {
                return new Promise(function(n, r) {
                    var o = f.data,
                        i = f.headers;
                    d.isFormData(o) && delete i["Content-Type"];
                    var s = new XMLHttpRequest,
                        e = "onreadystatechange",
                        a = !1;
                    if ("test" === p.env.NODE_ENV || "undefined" == typeof window || !window.XDomainRequest || "withCredentials" in s || y(f.url) || (s = new window.XDomainRequest, e = "onload", a = !0, s.onprogress = function() {}, s.ontimeout = function() {}), f.auth) {
                        var t = f.auth.username || "",
                            c = f.auth.password || "";
                        i.Authorization = "Basic " + w(t + ":" + c)
                    }
                    if (s.open(f.method.toUpperCase(), m(f.url, f.params, f.paramsSerializer), !0), s.timeout = f.timeout, s[e] = function() {
                            if (s && (4 === s.readyState || a) && (0 !== s.status || s.responseURL && 0 === s.responseURL.indexOf("file:"))) {
                                var e = "getAllResponseHeaders" in s ? g(s.getAllResponseHeaders()) : null,
                                    t = {
                                        data: f.responseType && "text" !== f.responseType ? s.response : s.responseText,
                                        status: 1223 === s.status ? 204 : s.status,
                                        statusText: 1223 === s.status ? "No Content" : s.statusText,
                                        headers: e,
                                        config: f,
                                        request: s
                                    };
                                h(n, r, t), s = null
                            }
                        }, s.onerror = function() {
                            r(v("Network Error", f, null, s)), s = null
                        }, s.ontimeout = function() {
                            r(v("timeout of " + f.timeout + "ms exceeded", f, "ECONNABORTED", s)), s = null
                        }, d.isStandardBrowserEnv()) {
                        var u = x("./../helpers/cookies"),
                            l = (f.withCredentials || y(f.url)) && f.xsrfCookieName ? u.read(f.xsrfCookieName) : void 0;
                        l && (i[f.xsrfHeaderName] = l)
                    }
                    if ("setRequestHeader" in s && d.forEach(i, function(e, t) {
                            void 0 === o && "content-type" === t.toLowerCase() ? delete i[t] : s.setRequestHeader(t, e)
                        }), f.withCredentials && (s.withCredentials = !0), f.responseType) try {
                        s.responseType = f.responseType
                    } catch (e) {
                        if ("json" !== f.responseType) throw e
                    }
                    "function" == typeof f.onDownloadProgress && s.addEventListener("progress", f.onDownloadProgress), "function" == typeof f.onUploadProgress && s.upload && s.upload.addEventListener("progress", f.onUploadProgress), f.cancelToken && f.cancelToken.promise.then(function(e) {
                        s && (s.abort(), r(e), s = null)
                    }), void 0 === o && (o = null), s.send(o)
                })
            }
        }).call(this, x("_process"))
    }, {
        "../core/createError": 10,
        "./../core/settle": 13,
        "./../helpers/btoa": 17,
        "./../helpers/buildURL": 18,
        "./../helpers/cookies": 20,
        "./../helpers/isURLSameOrigin": 22,
        "./../helpers/parseHeaders": 24,
        "./../utils": 26,
        _process: 28
    }],
    4: [function(e, t, n) {
        "use strict";
        var r = e("./utils"),
            o = e("./helpers/bind"),
            i = e("./core/Axios"),
            s = e("./defaults");

        function a(e) {
            var t = new i(e),
                n = o(i.prototype.request, t);
            return r.extend(n, i.prototype, t), r.extend(n, t), n
        }
        var c = a(s);
        c.Axios = i, c.create = function(e) {
            return a(r.merge(s, e))
        }, c.Cancel = e("./cancel/Cancel"), c.CancelToken = e("./cancel/CancelToken"), c.isCancel = e("./cancel/isCancel"), c.all = function(e) {
            return Promise.all(e)
        }, c.spread = e("./helpers/spread"), t.exports = c, t.exports.default = c
    }, {
        "./cancel/Cancel": 5,
        "./cancel/CancelToken": 6,
        "./cancel/isCancel": 7,
        "./core/Axios": 8,
        "./defaults": 15,
        "./helpers/bind": 16,
        "./helpers/spread": 25,
        "./utils": 26
    }],
    5: [function(e, t, n) {
        "use strict";

        function r(e) {
            this.message = e
        }
        r.prototype.toString = function() {
            return "Cancel" + (this.message ? ": " + this.message : "")
        }, r.prototype.__CANCEL__ = !0, t.exports = r
    }, {}],
    6: [function(e, t, n) {
        "use strict";
        var r = e("./Cancel");

        function o(e) {
            if ("function" != typeof e) throw new TypeError("executor must be a function.");
            var t;
            this.promise = new Promise(function(e) {
                t = e
            });
            var n = this;
            e(function(e) {
                n.reason || (n.reason = new r(e), t(n.reason))
            })
        }
        o.prototype.throwIfRequested = function() {
            if (this.reason) throw this.reason
        }, o.source = function() {
            var t;
            return {
                token: new o(function(e) {
                    t = e
                }),
                cancel: t
            }
        }, t.exports = o
    }, {
        "./Cancel": 5
    }],
    7: [function(e, t, n) {
        "use strict";
        t.exports = function(e) {
            return !(!e || !e.__CANCEL__)
        }
    }, {}],
    8: [function(e, t, n) {
        "use strict";
        var r = e("./../defaults"),
            o = e("./../utils"),
            i = e("./InterceptorManager"),
            s = e("./dispatchRequest");

        function a(e) {
            this.defaults = e, this.interceptors = {
                request: new i,
                response: new i
            }
        }
        a.prototype.request = function(e) {
            "string" == typeof e && (e = o.merge({
                url: arguments[0]
            }, arguments[1])), (e = o.merge(r, {
                method: "get"
            }, this.defaults, e)).method = e.method.toLowerCase();
            var t = [s, void 0],
                n = Promise.resolve(e);
            for (this.interceptors.request.forEach(function(e) {
                    t.unshift(e.fulfilled, e.rejected)
                }), this.interceptors.response.forEach(function(e) {
                    t.push(e.fulfilled, e.rejected)
                }); t.length;) n = n.then(t.shift(), t.shift());
            return n
        }, o.forEach(["delete", "get", "head", "options"], function(n) {
            a.prototype[n] = function(e, t) {
                return this.request(o.merge(t || {}, {
                    method: n,
                    url: e
                }))
            }
        }), o.forEach(["post", "put", "patch"], function(r) {
            a.prototype[r] = function(e, t, n) {
                return this.request(o.merge(n || {}, {
                    method: r,
                    url: e,
                    data: t
                }))
            }
        }), t.exports = a
    }, {
        "./../defaults": 15,
        "./../utils": 26,
        "./InterceptorManager": 9,
        "./dispatchRequest": 11
    }],
    9: [function(e, t, n) {
        "use strict";
        var r = e("./../utils");

        function o() {
            this.handlers = []
        }
        o.prototype.use = function(e, t) {
            return this.handlers.push({
                fulfilled: e,
                rejected: t
            }), this.handlers.length - 1
        }, o.prototype.eject = function(e) {
            this.handlers[e] && (this.handlers[e] = null)
        }, o.prototype.forEach = function(t) {
            r.forEach(this.handlers, function(e) {
                null !== e && t(e)
            })
        }, t.exports = o
    }, {
        "./../utils": 26
    }],
    10: [function(e, t, n) {
        "use strict";
        var s = e("./enhanceError");
        t.exports = function(e, t, n, r, o) {
            var i = new Error(e);
            return s(i, t, n, r, o)
        }
    }, {
        "./enhanceError": 12
    }],
    11: [function(e, t, n) {
        "use strict";
        var r = e("./../utils"),
            o = e("./transformData"),
            i = e("../cancel/isCancel"),
            s = e("../defaults"),
            a = e("./../helpers/isAbsoluteURL"),
            c = e("./../helpers/combineURLs");

        function u(e) {
            e.cancelToken && e.cancelToken.throwIfRequested()
        }
        t.exports = function(t) {
            return u(t), t.baseURL && !a(t.url) && (t.url = c(t.baseURL, t.url)), t.headers = t.headers || {}, t.data = o(t.data, t.headers, t.transformRequest), t.headers = r.merge(t.headers.common || {}, t.headers[t.method] || {}, t.headers || {}), r.forEach(["delete", "get", "head", "post", "put", "patch", "common"], function(e) {
                delete t.headers[e]
            }), (t.adapter || s.adapter)(t).then(function(e) {
                return u(t), e.data = o(e.data, e.headers, t.transformResponse), e
            }, function(e) {
                return i(e) || (u(t), e && e.response && (e.response.data = o(e.response.data, e.response.headers, t.transformResponse))), Promise.reject(e)
            })
        }
    }, {
        "../cancel/isCancel": 7,
        "../defaults": 15,
        "./../helpers/combineURLs": 19,
        "./../helpers/isAbsoluteURL": 21,
        "./../utils": 26,
        "./transformData": 14
    }],
    12: [function(e, t, n) {
        "use strict";
        t.exports = function(e, t, n, r, o) {
            return e.config = t, n && (e.code = n), e.request = r, e.response = o, e
        }
    }, {}],
    13: [function(e, t, n) {
        "use strict";
        var o = e("./createError");
        t.exports = function(e, t, n) {
            var r = n.config.validateStatus;
            n.status && r && !r(n.status) ? t(o("Request failed with status code " + n.status, n.config, null, n.request, n)) : e(n)
        }
    }, {
        "./createError": 10
    }],
    14: [function(e, t, n) {
        "use strict";
        var r = e("./../utils");
        t.exports = function(t, n, e) {
            return r.forEach(e, function(e) {
                t = e(t, n)
            }), t
        }
    }, {
        "./../utils": 26
    }],
    15: [function(a, c, e) {
        (function(e) {
            "use strict";
            var n = a("./utils"),
                r = a("./helpers/normalizeHeaderName"),
                t = {
                    "Content-Type": "application/x-www-form-urlencoded"
                };

            function o(e, t) {
                !n.isUndefined(e) && n.isUndefined(e["Content-Type"]) && (e["Content-Type"] = t)
            }
            var i, s = {
                adapter: ("undefined" != typeof XMLHttpRequest ? i = a("./adapters/xhr") : void 0 !== e && (i = a("./adapters/http")), i),
                transformRequest: [function(e, t) {
                    return r(t, "Content-Type"), n.isFormData(e) || n.isArrayBuffer(e) || n.isBuffer(e) || n.isStream(e) || n.isFile(e) || n.isBlob(e) ? e : n.isArrayBufferView(e) ? e.buffer : n.isURLSearchParams(e) ? (o(t, "application/x-www-form-urlencoded;charset=utf-8"), e.toString()) : n.isObject(e) ? (o(t, "application/json;charset=utf-8"), JSON.stringify(e)) : e
                }],
                transformResponse: [function(e) {
                    if ("string" == typeof e) try {
                        e = JSON.parse(e)
                    } catch (e) {}
                    return e
                }],
                timeout: 0,
                xsrfCookieName: "XSRF-TOKEN",
                xsrfHeaderName: "X-XSRF-TOKEN",
                maxContentLength: -1,
                validateStatus: function(e) {
                    return 200 <= e && e < 300
                }
            };
            s.headers = {
                common: {
                    Accept: "application/json, text/plain, */*"
                }
            }, n.forEach(["delete", "get", "head"], function(e) {
                s.headers[e] = {}
            }), n.forEach(["post", "put", "patch"], function(e) {
                s.headers[e] = n.merge(t)
            }), c.exports = s
        }).call(this, a("_process"))
    }, {
        "./adapters/http": 3,
        "./adapters/xhr": 3,
        "./helpers/normalizeHeaderName": 23,
        "./utils": 26,
        _process: 28
    }],
    16: [function(e, t, n) {
        "use strict";
        t.exports = function(n, r) {
            return function() {
                for (var e = new Array(arguments.length), t = 0; t < e.length; t++) e[t] = arguments[t];
                return n.apply(r, e)
            }
        }
    }, {}],
    17: [function(e, t, n) {
        "use strict";

        function a() {
            this.message = "String contains an invalid character"
        }(a.prototype = new Error).code = 5, a.prototype.name = "InvalidCharacterError", t.exports = function(e) {
            for (var t, n, r = String(e), o = "", i = 0, s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="; r.charAt(0 | i) || (s = "=", i % 1); o += s.charAt(63 & t >> 8 - i % 1 * 8)) {
                if (255 < (n = r.charCodeAt(i += .75))) throw new a;
                t = t << 8 | n
            }
            return o
        }
    }, {}],
    18: [function(e, t, n) {
        "use strict";
        var i = e("./../utils");

        function s(e) {
            return encodeURIComponent(e).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]")
        }
        t.exports = function(e, t, n) {
            if (!t) return e;
            var r;
            if (n) r = n(t);
            else if (i.isURLSearchParams(t)) r = t.toString();
            else {
                var o = [];
                i.forEach(t, function(e, t) {
                    null != e && (i.isArray(e) ? t += "[]" : e = [e], i.forEach(e, function(e) {
                        i.isDate(e) ? e = e.toISOString() : i.isObject(e) && (e = JSON.stringify(e)), o.push(s(t) + "=" + s(e))
                    }))
                }), r = o.join("&")
            }
            return r && (e += (-1 === e.indexOf("?") ? "?" : "&") + r), e
        }
    }, {
        "./../utils": 26
    }],
    19: [function(e, t, n) {
        "use strict";
        t.exports = function(e, t) {
            return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e
        }
    }, {}],
    20: [function(e, t, n) {
        "use strict";
        var a = e("./../utils");
        t.exports = a.isStandardBrowserEnv() ? {
            write: function(e, t, n, r, o, i) {
                var s = [];
                s.push(e + "=" + encodeURIComponent(t)), a.isNumber(n) && s.push("expires=" + new Date(n).toGMTString()), a.isString(r) && s.push("path=" + r), a.isString(o) && s.push("domain=" + o), !0 === i && s.push("secure"), document.cookie = s.join("; ")
            },
            read: function(e) {
                var t = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));
                return t ? decodeURIComponent(t[3]) : null
            },
            remove: function(e) {
                this.write(e, "", Date.now() - 864e5)
            }
        } : {
            write: function() {},
            read: function() {
                return null
            },
            remove: function() {}
        }
    }, {
        "./../utils": 26
    }],
    21: [function(e, t, n) {
        "use strict";
        t.exports = function(e) {
            return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)
        }
    }, {}],
    22: [function(e, t, n) {
        "use strict";
        var s = e("./../utils");
        t.exports = s.isStandardBrowserEnv() ? function() {
            var n, r = /(msie|trident)/i.test(navigator.userAgent),
                o = document.createElement("a");

            function i(e) {
                var t = e;
                return r && (o.setAttribute("href", t), t = o.href), o.setAttribute("href", t), {
                    href: o.href,
                    protocol: o.protocol ? o.protocol.replace(/:$/, "") : "",
                    host: o.host,
                    search: o.search ? o.search.replace(/^\?/, "") : "",
                    hash: o.hash ? o.hash.replace(/^#/, "") : "",
                    hostname: o.hostname,
                    port: o.port,
                    pathname: "/" === o.pathname.charAt(0) ? o.pathname : "/" + o.pathname
                }
            }
            return n = i(window.location.href),
                function(e) {
                    var t = s.isString(e) ? i(e) : e;
                    return t.protocol === n.protocol && t.host === n.host
                }
        }() : function() {
            return !0
        }
    }, {
        "./../utils": 26
    }],
    23: [function(e, t, n) {
        "use strict";
        var o = e("../utils");
        t.exports = function(n, r) {
            o.forEach(n, function(e, t) {
                t !== r && t.toUpperCase() === r.toUpperCase() && (n[r] = e, delete n[t])
            })
        }
    }, {
        "../utils": 26
    }],
    24: [function(e, t, n) {
        "use strict";
        var i = e("./../utils"),
            s = ["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"];
        t.exports = function(e) {
            var t, n, r, o = {};
            return e && i.forEach(e.split("\n"), function(e) {
                if (r = e.indexOf(":"), t = i.trim(e.substr(0, r)).toLowerCase(), n = i.trim(e.substr(r + 1)), t) {
                    if (o[t] && 0 <= s.indexOf(t)) return;
                    o[t] = "set-cookie" === t ? (o[t] ? o[t] : []).concat([n]) : o[t] ? o[t] + ", " + n : n
                }
            }), o
        }
    }, {
        "./../utils": 26
    }],
    25: [function(e, t, n) {
        "use strict";
        t.exports = function(t) {
            return function(e) {
                return t.apply(null, e)
            }
        }
    }, {}],
    26: [function(e, t, n) {
        "use strict";
        var o = e("./helpers/bind"),
            r = e("is-buffer"),
            i = Object.prototype.toString;

        function s(e) {
            return "[object Array]" === i.call(e)
        }

        function a(e) {
            return null !== e && "object" == typeof e
        }

        function c(e) {
            return "[object Function]" === i.call(e)
        }

        function u(e, t) {
            if (null != e)
                if ("object" != typeof e && (e = [e]), s(e))
                    for (var n = 0, r = e.length; n < r; n++) t.call(null, e[n], n, e);
                else
                    for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && t.call(null, e[o], o, e)
        }
        t.exports = {
            isArray: s,
            isArrayBuffer: function(e) {
                return "[object ArrayBuffer]" === i.call(e)
            },
            isBuffer: r,
            isFormData: function(e) {
                return "undefined" != typeof FormData && e instanceof FormData
            },
            isArrayBufferView: function(e) {
                return "undefined" != typeof ArrayBuffer && ArrayBuffer.isView ? ArrayBuffer.isView(e) : e && e.buffer && e.buffer instanceof ArrayBuffer
            },
            isString: function(e) {
                return "string" == typeof e
            },
            isNumber: function(e) {
                return "number" == typeof e
            },
            isObject: a,
            isUndefined: function(e) {
                return void 0 === e
            },
            isDate: function(e) {
                return "[object Date]" === i.call(e)
            },
            isFile: function(e) {
                return "[object File]" === i.call(e)
            },
            isBlob: function(e) {
                return "[object Blob]" === i.call(e)
            },
            isFunction: c,
            isStream: function(e) {
                return a(e) && c(e.pipe)
            },
            isURLSearchParams: function(e) {
                return "undefined" != typeof URLSearchParams && e instanceof URLSearchParams
            },
            isStandardBrowserEnv: function() {
                return ("undefined" == typeof navigator || "ReactNative" !== navigator.product) && "undefined" != typeof window && "undefined" != typeof document
            },
            forEach: u,
            merge: function n() {
                var r = {};

                function e(e, t) {
                    "object" == typeof r[t] && "object" == typeof e ? r[t] = n(r[t], e) : r[t] = e
                }
                for (var t = 0, o = arguments.length; t < o; t++) u(arguments[t], e);
                return r
            },
            extend: function(n, e, r) {
                return u(e, function(e, t) {
                    n[t] = r && "function" == typeof e ? o(e, r) : e
                }), n
            },
            trim: function(e) {
                return e.replace(/^\s*/, "").replace(/\s*$/, "")
            }
        }
    }, {
        "./helpers/bind": 16,
        "is-buffer": 27
    }],
    27: [function(e, t, n) {
        function r(e) {
            return !!e.constructor && "function" == typeof e.constructor.isBuffer && e.constructor.isBuffer(e)
        }
        t.exports = function(e) {
            return null != e && (r(e) || "function" == typeof(t = e).readFloatLE && "function" == typeof t.slice && r(t.slice(0, 0)) || !!e._isBuffer);
            var t
        }
    }, {}],
    28: [function(e, t, n) {
        var r, o, i = t.exports = {};

        function s() {
            throw new Error("setTimeout has not been defined")
        }

        function a() {
            throw new Error("clearTimeout has not been defined")
        }

        function c(t) {
            if (r === setTimeout) return setTimeout(t, 0);
            if ((r === s || !r) && setTimeout) return r = setTimeout, setTimeout(t, 0);
            try {
                return r(t, 0)
            } catch (e) {
                try {
                    return r.call(null, t, 0)
                } catch (e) {
                    return r.call(this, t, 0)
                }
            }
        }! function() {
            try {
                r = "function" == typeof setTimeout ? setTimeout : s
            } catch (e) {
                r = s
            }
            try {
                o = "function" == typeof clearTimeout ? clearTimeout : a
            } catch (e) {
                o = a
            }
        }();
        var u, l = [],
            f = !1,
            p = -1;

        function d() {
            f && u && (f = !1, u.length ? l = u.concat(l) : p = -1, l.length && h())
        }

        function h() {
            if (!f) {
                var e = c(d);
                f = !0;
                for (var t = l.length; t;) {
                    for (u = l, l = []; ++p < t;) u && u[p].run();
                    p = -1, t = l.length
                }
                u = null, f = !1,
                    function(t) {
                        if (o === clearTimeout) return clearTimeout(t);
                        if ((o === a || !o) && clearTimeout) return o = clearTimeout, clearTimeout(t);
                        try {
                            o(t)
                        } catch (e) {
                            try {
                                return o.call(null, t)
                            } catch (e) {
                                return o.call(this, t)
                            }
                        }
                    }(e)
            }
        }

        function m(e, t) {
            this.fun = e, this.array = t
        }

        function g() {}
        i.nextTick = function(e) {
            var t = new Array(arguments.length - 1);
            if (1 < arguments.length)
                for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
            l.push(new m(e, t)), 1 !== l.length || f || c(h)
        }, m.prototype.run = function() {
            this.fun.apply(null, this.array)
        }, i.title = "browser", i.browser = !0, i.env = {}, i.argv = [], i.version = "", i.versions = {}, i.on = g, i.addListener = g, i.once = g, i.off = g, i.removeListener = g, i.removeAllListeners = g, i.emit = g, i.prependListener = g, i.prependOnceListener = g, i.listeners = function(e) {
            return []
        }, i.binding = function(e) {
            throw new Error("process.binding is not supported")
        }, i.cwd = function() {
            return "/"
        }, i.chdir = function(e) {
            throw new Error("process.chdir is not supported")
        }, i.umask = function() {
            return 0
        }
    }, {}]
}, {}, [1]);
