$(function () {
    var API_URL = 'https://api.127.0.0.1.xip.io';
    var OAUTH_AUTHORIZE_URL = 'https://auth.127.0.0.1.xip.io/oauth/authorize';
    var OAUTH_TOKEN_URL = 'https://auth.127.0.0.1.xip.io/oauth/tokens';
    var OAUTH_CLIENT_ID = 999;
    var OAUTH_CLIENT_SECRET_CODE = 'zhsWEfnOHgsOFMj1GinFri4mGihOKJ3IWB5ySHbs';

    var oauth_access_token;


    function api(resource, method, data, successCallback, errorCallback) {
        console.log('Requesting ' + resource);

        var headers = {}

        var config = {
            baseURL: API_URL,
            method: method,
            url: resource,
            data: data,
            withCredentials: true,
            headers: headers
        };
        if (oauth_access_token) {
            config.headers = {'Authorization': 'Bearer ' + oauth_access_token};
        }


        axios(config).then(function (response) {
            console.log('Response ok')
            successCallback(response.data)
        }).catch(function (error) {
            console.log('Response error')
            if (error.request != undefined && error.request.status == 401) {
                console.log('Auth required');
                auth('');
            } else {
                errorCallback(error);
            }
        });
    }

    function auth(scope) {
        var auth_url = OAUTH_AUTHORIZE_URL;
        var redirect_url = document.location.protocol + "//" + document.location.host + '/';

        var params = {
            response_type: 'token',
            client_id: 999,
            redirect_uri: redirect_url,
            scope: scope,
        };

        auth_url += '?' + $.param(params);
        document.location.href = auth_url;
    }

    function loadUsers() {
        var $loadButtnon = $('button#refresh');
        $loadButtnon.button('loading');

        api('/users', 'GET', null, function (data) {
            var $users = $('table#users');
            $users.find('tr').not('.header').remove();
            data.forEach(function (item) {
                var $row = $('<tr></tr>');
                $row.data('id', item.id);
                $row.append('<td>' + item.id + '</td>');
                $row.append('<td>' + item.name + '</td>');
                $row.append('<td>' + item.email + '</td>');
                $row.append('<td><button class="button view">View</button></td>');
                $row.appendTo($users);
            });
            $users.find('button.view').click(viewUserClick);
            $(".panel.user").hide();
            $(".panel.users").show();
            $loadButtnon.button('reset');
        }, function (error) {
            alert('Network error');
            $loadButtnon.button('reset');
        });
    }

    function viewUserClick() {
        var $this = $(this);
        var $row = $this.closest('tr');
        var id = $row.data('id');
        $this.button('loading');
        api('/user/' + id, 'GET', null, function (data) {
            ["id", "name", "email"].forEach(function(item) {
                $(".user-" + item).text(data[item]);
            });
            $(".panel.users").hide();
            $(".panel.user").show();
            $this.button('reset');
        }, function (error) {
            alert('Network error');
            $this.button('reset');
        });
    }


    $('button#refresh').click(function () {
        loadUsers();
    }).click();
    $('button#back').click(function () {
        $(".panel.user").hide();
        $(".panel.users").show  ();
    });

    parseHashQueryString = function () {

        var str = window.location.hash;
        if (str) {
            str = str.substring(1);
        }
        var objURL = {};


        str.replace(
            new RegExp("([^?=&]+)(=([^&]*))?", "g"),
            function ($0, $1, $2, $3) {
                objURL[$1] = $3;
            }
        );
        return objURL;
    };

    var hash = parseHashQueryString();
    if (hash.access_token != undefined) {
        oauth_access_token = hash.access_token;
    }

});