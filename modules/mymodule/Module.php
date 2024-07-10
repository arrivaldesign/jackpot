<?php
namespace modules\mymodule;

use Craft;
use yii\base\Module as BaseModule;
use craft\commerce\events\CreateSubscriptionEvent;
use craft\commerce\services\Subscriptions;
use yii\base\Event;

class Module extends BaseModule
{
    public function init()
    {
        parent::init();
        Craft::setAlias('@modules/mymodule', __DIR__);
        
        if (Craft::$app->getPlugins()->isPluginEnabled('commerce')) {
            $this->attachEventHandlers();
        }
    }

    private function attachEventHandlers()
    {
        Event::on(
            Subscriptions::class,
            Subscriptions::EVENT_BEFORE_CREATE_SUBSCRIPTION,
            function(CreateSubscriptionEvent $event) {
                $subscription = $event->subscription;
                
            
                $endOfMonth = new \DateTime('last day of this month 23:59:59', new \DateTimeZone(Craft::$app->getTimeZone()));
                
               
                $nextPaymentDate = new \DateTime('first day of next month', new \DateTimeZone(Craft::$app->getTimeZone()));
                
              
                $utc = new \DateTimeZone('UTC');
                $endOfMonthUTC = $endOfMonth->setTimezone($utc);
                $nextPaymentDateUTC = $nextPaymentDate->setTimezone($utc);
                
                $subscription->nextPaymentDate = $nextPaymentDateUTC;
                $subscription->dateExpires = $endOfMonthUTC;

                Craft::info(
                    "Subscription updated: " . 
                    "Next payment: " . $subscription->nextPaymentDate->format('Y-m-d H:i:s') . 
                    ", Expires: " . $subscription->dateExpires->format('Y-m-d H:i:s'),
                    __METHOD__
                );
            }
        );
    }
}