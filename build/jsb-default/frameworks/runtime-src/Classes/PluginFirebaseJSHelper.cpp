#include "PluginFirebaseJSHelper.h"
#include "PluginFirebase/PluginFirebase.h"
#include "SDKBoxJSHelper.h"

void analytics_register_constants(se::Value &analytics)
{
    cocos2d::ValueMap enums;
    enums.clear();
    enums["kFIREventAddPaymentInfo"] = "add_payment_info";
    enums["kFIREventAddToCart"] = "add_to_cart";
    enums["kFIREventAddToWishlist"] = "add_to_wishlist";
    enums["kFIREventAppOpen"] = "app_open";
    enums["kFIREventBeginCheckout"] = "begin_checkout";
    enums["kFIREventCampaignDetails"] = "campaign_details";
    enums["kFIREventCheckoutProgress"] = "checkout_progress";
    enums["kFIREventEarnVirtualCurrency"] = "earn_virtual_currency";
    enums["kFIREventEcommercePurchase"] = "ecommerce_purchase";
    enums["kFIREventGenerateLead"] = "generate_lead";
    enums["kFIREventJoinGroup"] = "join_group";
    enums["kFIREventLevelUp"] = "level_up";
    enums["kFIREventLogin"] = "login";
    enums["kFIREventPostScore"] = "post_score";
    enums["kFIREventPresentOffer"] = "present_offer";
    enums["kFIREventPurchaseRefund"] = "purchase_refund";
    enums["kFIREventRemoveFromCart"] = "remove_from_cart";
    enums["kFIREventSearch"] = "search";
    enums["kFIREventSelectContent"] = "select_content";
    enums["kFIREventSetCheckoutOption"] = "set_checkout_option";
    enums["kFIREventShare"] = "share";
    enums["kFIREventSignUp"] = "sign_up";
    enums["kFIREventSpendVirtualCurrency"] = "spend_virtual_currency";
    enums["kFIREventTutorialBegin"] = "tutorial_begin";
    enums["kFIREventTutorialComplete"] = "tutorial_complete";
    enums["kFIREventUnlockAchievement"] = "unlock_achievement";
    enums["kFIREventViewItem"] = "view_item";
    enums["kFIREventViewItemList"] = "view_item_list";
    enums["kFIREventViewSearchResults"] = "view_search_results";
    enums["kFIREventLevelStart"] = "level_start";
    enums["kFIREventLevelEnd"] = "level_end";

    se::Value event;
    ccvaluemap_to_seval(enums, &event);
    analytics.toObject()->setProperty("Event", event);

    enums.clear();
    enums["kFIRParameterAchievementID"] = "achievement_id";
    enums["kFIRParameterAdNetworkClickID"] = "aclid";
    enums["kFIRParameterAffiliation"] = "affiliation";
    enums["kFIRParameterCampaign"] = "campaign";
    enums["kFIRParameterCharacter"] = "character";
    enums["kFIRParameterCheckoutStep"] = "checkout_step";
    enums["kFIRParameterCheckoutOption"] = "checkout_option";
    enums["kFIRParameterContent"] = "content";
    enums["kFIRParameterContentType"] = "content_type";
    enums["kFIRParameterCoupon"] = "coupon";
    enums["kFIRParameterCP1"] = "cp1";
    enums["kFIRParameterCreativeName"] = "creative_name";
    enums["kFIRParameterCreativeSlot"] = "creative_slot";
    enums["kFIRParameterCurrency"] = "currency";
    enums["kFIRParameterDestination"] = "destination";
    enums["kFIRParameterEndDate"] = "end_date";
    enums["kFIRParameterFlightNumber"] = "flight_number";
    enums["kFIRParameterGroupID"] = "group_id";
    enums["kFIRParameterIndex"] = "index";
    enums["kFIRParameterItemBrand"] = "item_brand";
    enums["kFIRParameterItemCategory"] = "item_category";
    enums["kFIRParameterItemID"] = "item_id";
    enums["kFIRParameterItemLocationID"] = "item_location_id";
    enums["kFIRParameterItemName"] = "item_name";
    enums["kFIRParameterItemList"] = "item_list";
    enums["kFIRParameterItemVariant"] = "item_variant";
    enums["kFIRParameterLevel"] = "level";
    enums["kFIRParameterLocation"] = "location";
    enums["kFIRParameterMedium"] = "medium";
    enums["kFIRParameterNumberOfNights"] = "number_of_nights";
    enums["kFIRParameterNumberOfPassengers"] = "number_of_passengers";
    enums["kFIRParameterNumberOfRooms"] = "number_of_rooms";
    enums["kFIRParameterOrigin"] = "origin";
    enums["kFIRParameterPrice"] = "price";
    enums["kFIRParameterQuantity"] = "quantity";
    enums["kFIRParameterScore"] = "score";
    enums["kFIRParameterSearchTerm"] = "search_term";
    enums["kFIRParameterShipping"] = "shipping";
    enums["kFIRParameterSignUpMethod"] = "sign_up_method";
    enums["kFIRParameterMethod"] = "method";
    enums["kFIRParameterSource"] = "source";
    enums["kFIRParameterStartDate"] = "start_date";
    enums["kFIRParameterTax"] = "tax";
    enums["kFIRParameterTerm"] = "term";
    enums["kFIRParameterTransactionID"] = "transaction_id";
    enums["kFIRParameterTravelClass"] = "travel_class";
    enums["kFIRParameterValue"] = "value";
    enums["kFIRParameterVirtualCurrencyName"] = "virtual_currency_name";
    enums["kFIRParameterLevelName"] = "level_name";
    enums["kFIRParameterSuccess"] = "success";

    se::Value param;
    ccvaluemap_to_seval(enums, &param);
    analytics.toObject()->setProperty("Param", param);
}

extern se::Object* __jsb_sdkbox_PluginFirebase_proto;
extern se::Class* __jsb_sdkbox_PluginFirebase_class;
bool register_all_PluginFirebaseJS_helper(se::Object* obj)
{
    // move 'sdkboxfirebase' to 'sdkbox.firebase'
    se::Value sdkbox;
    if (!obj->getProperty("sdkbox", &sdkbox))
    {
        se::HandleObject jsobj(se::Object::createPlainObject());
        sdkbox.setObject(jsobj);
        obj->setProperty("sdkbox", sdkbox);
    }

    se::Value sdkboxfirebase;
    obj->getProperty("sdkboxfirebase", &sdkboxfirebase);
    sdkbox.toObject()->setProperty("firebase", sdkboxfirebase);

    se::Value analytics;
    sdkboxfirebase.toObject()->getProperty("Analytics", &analytics);
    analytics_register_constants(analytics);

    se::ScriptEngine::getInstance()->clearException();
    return true;
}

