<?php
/**
 * Site URL Rules
 *
 * You can define custom site URL rules here, which Craft will check in addition
 * to routes defined in Settings → Routes.
 *
 * Read all about Craft’s routing behavior, here:
 * https://craftcms.com/docs/4.x/routing.html
 */

 return [
    'login' => ['template' => '_user/login'],
    'profile' => ['template' => '_user/profile'],
    'register' => ['template' => '_user/register'],
    'reset-password' => ['template' => '_user-password-reset-page'],
    'setpassword' => ['template' => '_user/password-set-page'],
    'addresses' => ['template' => '_user/address-list-page'],
    'addresses/new' => ['template' => '_user/address-new-page'],
    'addresses/<addressId:\d+>' => ['template' => '_user/address-edit-page'],
];
