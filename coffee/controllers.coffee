angular.module("starter.controllers", []).controller("DashCtrl", ($scope) ->
  ).controller("ChatsCtrl", ($scope, Chats) ->
    $scope.chats = Chats.all()
    $scope.remove = (chat) ->
      Chats.remove chat
      return

    return
  ).controller("ChatDetailCtrl", ($scope, $stateParams, Chats) ->
    $scope.chat = Chats.get($stateParams.chatId)
    return
  ).controller("FriendsCtrl", ($scope, Friends) ->
    $scope.friends = Friends.all()
    return
  ).controller("FriendDetailCtrl", ($scope, $stateParams, Friends) ->
    $scope.friend = Friends.get($stateParams.friendId)
    return
  ).controller "AccountCtrl", ($scope) ->
    $scope.settings = enableFriends: true
    return
