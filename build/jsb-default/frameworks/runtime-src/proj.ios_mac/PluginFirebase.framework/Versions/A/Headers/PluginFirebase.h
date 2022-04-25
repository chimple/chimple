/****************************************************************************

 Copyright (c) 2014-2020 SDKBOX Inc

 ****************************************************************************/

#ifndef _PLUGIN_FIREBASE_H_
#define _PLUGIN_FIREBASE_H_

#include <string>
#include <map>

namespace sdkbox {
    namespace Firebase {

        class Analytics {
        public:
            /*
             * FireBase Event Names Define
             */

            /// An Event is an important occurrence in your app that you want to measure. You can report up to
            /// 500 different types of Events per app and you can associate up to 25 unique parameters with each
            /// Event type. Some common events are suggested below, but you may also choose to specify custom
            /// Event types that are associated with your specific app. Each event type is identified by a
            /// unique name. Event names can be up to 40 characters long, may only contain alphanumeric
            /// characters and underscores ("_"), and must start with an alphabetic character. The "firebase_"
            /// prefix is reserved and should not be used.

            /// Add Payment Info event. This event signifies that a user has submitted their payment information
            /// to your app.
            static const std::string kFIREventAddPaymentInfo;

            /// E-Commerce Add To Cart event. This event signifies that an item was added to a cart for
            /// purchase. Add this event to a funnel with kFIREventEcommercePurchase to gauge the effectiveness
            /// of your checkout process. Note: If you supply the @c kFIRParameterValue parameter, you must
            /// also supply the @c kFIRParameterCurrency parameter so that revenue metrics can be computed
            /// accurately. Params:
            ///
            /// <ul>
            ///     <li>@c kFIRParameterQuantity (signed 64-bit integer as NSNumber)</li>
            ///     <li>@c kFIRParameterItemID (NSString)</li>
            ///     <li>@c kFIRParameterItemName (NSString)</li>
            ///     <li>@c kFIRParameterItemCategory (NSString)</li>
            ///     <li>@c kFIRParameterItemLocationID (NSString) (optional)</li>
            ///     <li>@c kFIRParameterPrice (double as NSNumber) (optional)</li>
            ///     <li>@c kFIRParameterCurrency (NSString) (optional)</li>
            ///     <li>@c kFIRParameterValue (double as NSNumber) (optional)</li>
            ///     <li>@c kFIRParameterOrigin (NSString) (optional)</li>
            ///     <li>@c kFIRParameterDestination (NSString) (optional)</li>
            ///     <li>@c kFIRParameterStartDate (NSString) (optional)</li>
            ///     <li>@c kFIRParameterEndDate (NSString) (optional)</li>
            /// </ul>
            static const std::string kFIREventAddToCart;

            /// E-Commerce Add To Wishlist event. This event signifies that an item was added to a wishlist.
            /// Use this event to identify popular gift items in your app. Note: If you supply the
            /// @c kFIRParameterValue parameter, you must also supply the @c kFIRParameterCurrency
            /// parameter so that revenue metrics can be computed accurately. Params:
            ///
            /// <ul>
            ///     <li>@c kFIRParameterQuantity (signed 64-bit integer as NSNumber)</li>
            ///     <li>@c kFIRParameterItemID (NSString)</li>
            ///     <li>@c kFIRParameterItemName (NSString)</li>
            ///     <li>@c kFIRParameterItemCategory (NSString)</li>
            ///     <li>@c kFIRParameterItemLocationID (NSString) (optional)</li>
            ///     <li>@c kFIRParameterPrice (double as NSNumber) (optional)</li>
            ///     <li>@c kFIRParameterCurrency (NSString) (optional)</li>
            ///     <li>@c kFIRParameterValue (double as NSNumber) (optional)</li>
            /// </ul>
            static const std::string kFIREventAddToWishlist;

            /// App Open event. By logging this event when an App becomes active, developers can understand how
            /// often users leave and return during the course of a Session. Although Sessions are automatically
            /// reported, this event can provide further clarification around the continuous engagement of
            /// app-users.
            static const std::string kFIREventAppOpen;

            /// E-Commerce Begin Checkout event. This event signifies that a user has begun the process of
            /// checking out. Add this event to a funnel with your kFIREventEcommercePurchase event to gauge the
            /// effectiveness of your checkout process. Note: If you supply the @c kFIRParameterValue
            /// parameter, you must also supply the @c kFIRParameterCurrency parameter so that revenue
            /// metrics can be computed accurately. Params:
            ///
            /// <ul>
            ///     <li>@c kFIRParameterValue (double as NSNumber) (optional)</li>
            ///     <li>@c kFIRParameterCurrency (NSString) (optional)</li>
            ///     <li>@c kFIRParameterTransactionID (NSString) (optional)</li>
            ///     <li>@c kFIRParameterStartDate (NSString) (optional)</li>
            ///     <li>@c kFIRParameterEndDate (NSString) (optional)</li>
            ///     <li>@c kFIRParameterNumberOfNights (signed 64-bit integer as NSNumber) (optional) for
            ///         hotel bookings</li>
            ///     <li>@c kFIRParameterNumberOfRooms (signed 64-bit integer as NSNumber) (optional) for
            ///         hotel bookings</li>
            ///     <li>@c kFIRParameterNumberOfPassengers (signed 64-bit integer as NSNumber) (optional)
            ///         for travel bookings</li>
            ///     <li>@c kFIRParameterOrigin (NSString) (optional)</li>
            ///     <li>@c kFIRParameterDestination (NSString) (optional)</li>
            ///     <li>@c kFIRParameterTravelClass (NSString) (optional) for travel bookings</li>
            /// </ul>
            static const std::string kFIREventBeginCheckout;

            /// Campaign Detail event. Log this event to supply the referral details of a re-engagement
            /// campaign. Note: you must supply at least one of the required parameters kFIRParameterSource,
            /// kFIRParameterMedium or kFIRParameterCampaign. Params:
            ///
            /// <ul>
            ///     <li>@c kFIRParameterSource (NSString)</li>
            ///     <li>@c kFIRParameterMedium (NSString)</li>
            ///     <li>@c kFIRParameterCampaign (NSString)</li>
            ///     <li>@c kFIRParameterTerm (NSString) (optional)</li>
            ///     <li>@c kFIRParameterContent (NSString) (optional)</li>
            ///     <li>@c kFIRParameterAdNetworkClickID (NSString) (optional)</li>
            ///     <li>@c kFIRParameterCP1 (NSString) (optional)</li>
            /// </ul>
            static const std::string kFIREventCampaignDetails;

            /// Checkout progress. Params:
            ///
            /// <ul>
            ///    <li>@c kFIRParameterCheckoutStep (unsigned 64-bit integer as NSNumber)</li>
            ///    <li>@c kFIRParameterCheckoutOption (NSString) (optional)</li>
            /// </ul>
            static const std::string kFIREventCheckoutProgress;

            /// Earn Virtual Currency event. This event tracks the awarding of virtual currency in your app. Log
            /// this along with @c kFIREventSpendVirtualCurrency to better understand your virtual economy.
            /// Params:
            ///
            /// <ul>
            ///     <li>@c kFIRParameterVirtualCurrencyName (NSString)</li>
            ///     <li>@c kFIRParameterValue (signed 64-bit integer or double as NSNumber)</li>
            /// </ul>
            static const std::string kFIREventEarnVirtualCurrency;

            /// E-Commerce Purchase event. This event signifies that an item was purchased by a user. Note:
            /// This is different from the in-app purchase event, which is reported automatically for App
            /// Store-based apps. Note: If you supply the @c kFIRParameterValue parameter, you must also
            /// supply the @c kFIRParameterCurrency parameter so that revenue metrics can be computed
            /// accurately. Params:
            ///
            /// <ul>
            ///     <li>@c kFIRParameterCurrency (NSString) (optional)</li>
            ///     <li>@c kFIRParameterValue (double as NSNumber) (optional)</li>
            ///     <li>@c kFIRParameterTransactionID (NSString) (optional)</li>
            ///     <li>@c kFIRParameterTax (double as NSNumber) (optional)</li>
            ///     <li>@c kFIRParameterShipping (double as NSNumber) (optional)</li>
            ///     <li>@c kFIRParameterCoupon (NSString) (optional)</li>
            ///     <li>@c kFIRParameterLocation (NSString) (optional)</li>
            ///     <li>@c kFIRParameterStartDate (NSString) (optional)</li>
            ///     <li>@c kFIRParameterEndDate (NSString) (optional)</li>
            ///     <li>@c kFIRParameterNumberOfNights (signed 64-bit integer as NSNumber) (optional) for
            ///         hotel bookings</li>
            ///     <li>@c kFIRParameterNumberOfRooms (signed 64-bit integer as NSNumber) (optional) for
            ///         hotel bookings</li>
            ///     <li>@c kFIRParameterNumberOfPassengers (signed 64-bit integer as NSNumber) (optional)
            ///         for travel bookings</li>
            ///     <li>@c kFIRParameterOrigin (NSString) (optional)</li>
            ///     <li>@c kFIRParameterDestination (NSString) (optional)</li>
            ///     <li>@c kFIRParameterTravelClass (NSString) (optional) for travel bookings</li>
            /// </ul>
            static const std::string kFIREventEcommercePurchase;

            /// Generate Lead event. Log this event when a lead has been generated in the app to understand the
            /// efficacy of your install and re-engagement campaigns. Note: If you supply the
            /// @c kFIRParameterValue parameter, you must also supply the @c kFIRParameterCurrency
            /// parameter so that revenue metrics can be computed accurately. Params:
            ///
            /// <ul>
            ///     <li>@c kFIRParameterCurrency (NSString) (optional)</li>
            ///     <li>@c kFIRParameterValue (double as NSNumber) (optional)</li>
            /// </ul>
            static const std::string kFIREventGenerateLead;

            /// Join Group event. Log this event when a user joins a group such as a guild, team or family. Use
            /// this event to analyze how popular certain groups or social features are in your app. Params:
            ///
            /// <ul>
            ///     <li>@c kFIRParameterGroupID (NSString)</li>
            /// </ul>
            static const std::string kFIREventJoinGroup;

            /// Level Up event. This event signifies that a player has leveled up in your gaming app. It can
            /// help you gauge the level distribution of your userbase and help you identify certain levels that
            /// are difficult to pass. Params:
            ///
            /// <ul>
            ///     <li>@c kFIRParameterLevel (signed 64-bit integer as NSNumber)</li>
            ///     <li>@c kFIRParameterCharacter (NSString) (optional)</li>
            /// </ul>
            static const std::string kFIREventLevelUp;

            /// Login event. Apps with a login feature can report this event to signify that a user has logged
            /// in.
            static const std::string kFIREventLogin;

            /// Post Score event. Log this event when the user posts a score in your gaming app. This event can
            /// help you understand how users are actually performing in your game and it can help you correlate
            /// high scores with certain audiences or behaviors. Params:
            ///
            /// <ul>
            ///     <li>@c kFIRParameterScore (signed 64-bit integer as NSNumber)</li>
            ///     <li>@c kFIRParameterLevel (signed 64-bit integer as NSNumber) (optional)</li>
            ///     <li>@c kFIRParameterCharacter (NSString) (optional)</li>
            /// </ul>
            static const std::string kFIREventPostScore;

            /// Present Offer event. This event signifies that the app has presented a purchase offer to a user.
            /// Add this event to a funnel with the kFIREventAddToCart and kFIREventEcommercePurchase to gauge
            /// your conversion process. Note: If you supply the @c kFIRParameterValue parameter, you must
            /// also supply the @c kFIRParameterCurrency parameter so that revenue metrics can be computed
            /// accurately. Params:
            ///
            /// <ul>
            ///     <li>@c kFIRParameterQuantity (signed 64-bit integer as NSNumber)</li>
            ///     <li>@c kFIRParameterItemID (NSString)</li>
            ///     <li>@c kFIRParameterItemName (NSString)</li>
            ///     <li>@c kFIRParameterItemCategory (NSString)</li>
            ///     <li>@c kFIRParameterItemLocationID (NSString) (optional)</li>
            ///     <li>@c kFIRParameterPrice (double as NSNumber) (optional)</li>
            ///     <li>@c kFIRParameterCurrency (NSString) (optional)</li>
            ///     <li>@c kFIRParameterValue (double as NSNumber) (optional)</li>
            /// </ul>
            static const std::string kFIREventPresentOffer;

            /// E-Commerce Purchase Refund event. This event signifies that an item purchase was refunded.
            /// Note: If you supply the @c kFIRParameterValue parameter, you must also supply the
            /// @c kFIRParameterCurrency parameter so that revenue metrics can be computed accurately.
            /// Params:
            ///
            /// <ul>
            ///     <li>@c kFIRParameterCurrency (NSString) (optional)</li>
            ///     <li>@c kFIRParameterValue (double as NSNumber) (optional)</li>
            ///     <li>@c kFIRParameterTransactionID (NSString) (optional)</li>
            /// </ul>
            static const std::string kFIREventPurchaseRefund;

            /// Remove from cart event. Params:
            ///
            /// <ul>
            ///     <li>@c kFIRParameterQuantity (signed 64-bit integer as NSNumber)</li>
            ///     <li>@c kFIRParameterItemID (NSString)</li>
            ///     <li>@c kFIRParameterItemName (NSString)</li>
            ///     <li>@c kFIRParameterItemCategory (NSString)</li>
            ///     <li>@c kFIRParameterItemLocationID (NSString) (optional)</li>
            ///     <li>@c kFIRParameterPrice (double as NSNumber) (optional)</li>
            ///     <li>@c kFIRParameterCurrency (NSString) (optional)</li>
            ///     <li>@c kFIRParameterValue (double as NSNumber) (optional)</li>
            ///     <li>@c kFIRParameterOrigin (NSString) (optional)</li>
            ///     <li>@c kFIRParameterDestination (NSString) (optional)</li>
            ///     <li>@c kFIRParameterStartDate (NSString) (optional)</li>
            ///     <li>@c kFIRParameterEndDate (NSString) (optional)</li>
            /// </ul>
            static const std::string kFIREventRemoveFromCart;

            /// Search event. Apps that support search features can use this event to contextualize search
            /// operations by supplying the appropriate, corresponding parameters. This event can help you
            /// identify the most popular content in your app. Params:
            ///
            /// <ul>
            ///     <li>@c kFIRParameterSearchTerm (NSString)</li>
            ///     <li>@c kFIRParameterStartDate (NSString) (optional)</li>
            ///     <li>@c kFIRParameterEndDate (NSString) (optional)</li>
            ///     <li>@c kFIRParameterNumberOfNights (signed 64-bit integer as NSNumber) (optional) for
            ///         hotel bookings</li>
            ///     <li>@c kFIRParameterNumberOfRooms (signed 64-bit integer as NSNumber) (optional) for
            ///         hotel bookings</li>
            ///     <li>@c kFIRParameterNumberOfPassengers (signed 64-bit integer as NSNumber) (optional)
            ///         for travel bookings</li>
            ///     <li>@c kFIRParameterOrigin (NSString) (optional)</li>
            ///     <li>@c kFIRParameterDestination (NSString) (optional)</li>
            ///     <li>@c kFIRParameterTravelClass (NSString) (optional) for travel bookings</li>
            /// </ul>
            static const std::string kFIREventSearch;

            /// Select Content event. This general purpose event signifies that a user has selected some content
            /// of a certain type in an app. The content can be any object in your app. This event can help you
            /// identify popular content and categories of content in your app. Params:
            ///
            /// <ul>
            ///     <li>@c kFIRParameterContentType (NSString)</li>
            ///     <li>@c kFIRParameterItemID (NSString)</li>
            /// </ul>
            static const std::string kFIREventSelectContent;

            /// Set checkout option. Params:
            ///
            /// <ul>
            ///    <li>@c kFIRParameterCheckoutStep (unsigned 64-bit integer as NSNumber)</li>
            ///    <li>@c kFIRParameterCheckoutOption (NSString)</li>
            /// </ul>
            static const std::string kFIREventSetCheckoutOption;

            /// Share event. Apps with social features can log the Share event to identify the most viral
            /// content. Params:
            ///
            /// <ul>
            ///     <li>@c kFIRParameterContentType (NSString)</li>
            ///     <li>@c kFIRParameterItemID (NSString)</li>
            /// </ul>
            static const std::string kFIREventShare;

            /// Sign Up event. This event indicates that a user has signed up for an account in your app. The
            /// parameter signifies the method by which the user signed up. Use this event to understand the
            /// different behaviors between logged in and logged out users. Params:
            ///
            /// <ul>
            ///     <li>@c kFIRParameterSignUpMethod (NSString)</li>
            /// </ul>
            static const std::string kFIREventSignUp;

            /// Spend Virtual Currency event. This event tracks the sale of virtual goods in your app and can
            /// help you identify which virtual goods are the most popular objects of purchase. Params:
            ///
            /// <ul>
            ///     <li>@c kFIRParameterItemName (NSString)</li>
            ///     <li>@c kFIRParameterVirtualCurrencyName (NSString)</li>
            ///     <li>@c kFIRParameterValue (signed 64-bit integer or double as NSNumber)</li>
            /// </ul>
            static const std::string kFIREventSpendVirtualCurrency;

            /// Tutorial Begin event. This event signifies the start of the on-boarding process in your app. Use
            /// this in a funnel with kFIREventTutorialComplete to understand how many users complete this
            /// process and move on to the full app experience.
            static const std::string kFIREventTutorialBegin;

            /// Tutorial End event. Use this event to signify the user's completion of your app's on-boarding
            /// process. Add this to a funnel with kFIREventTutorialBegin to gauge the completion rate of your
            /// on-boarding process.
            static const std::string kFIREventTutorialComplete;

            /// Unlock Achievement event. Log this event when the user has unlocked an achievement in your
            /// game. Since achievements generally represent the breadth of a gaming experience, this event can
            /// help you understand how many users are experiencing all that your game has to offer. Params:
            ///
            /// <ul>
            ///     <li>@c kFIRParameterAchievementID (NSString)</li>
            /// </ul>
            static const std::string kFIREventUnlockAchievement;

            /// View Item event. This event signifies that some content was shown to the user. This content may
            /// be a product, a webpage or just a simple image or text. Use the appropriate parameters to
            /// contextualize the event. Use this event to discover the most popular items viewed in your app.
            /// Note: If you supply the @c kFIRParameterValue parameter, you must also supply the
            /// @c kFIRParameterCurrency parameter so that revenue metrics can be computed accurately.
            /// Params:
            ///
            /// <ul>
            ///     <li>@c kFIRParameterItemID (NSString)</li>
            ///     <li>@c kFIRParameterItemName (NSString)</li>
            ///     <li>@c kFIRParameterItemCategory (NSString)</li>
            ///     <li>@c kFIRParameterItemLocationID (NSString) (optional)</li>
            ///     <li>@c kFIRParameterPrice (double as NSNumber) (optional)</li>
            ///     <li>@c kFIRParameterQuantity (signed 64-bit integer as NSNumber) (optional)</li>
            ///     <li>@c kFIRParameterCurrency (NSString) (optional)</li>
            ///     <li>@c kFIRParameterValue (double as NSNumber) (optional)</li>
            ///     <li>@c kFIRParameterStartDate (NSString) (optional)</li>
            ///     <li>@c kFIRParameterEndDate (NSString) (optional)</li>
            ///     <li>@c kFIRParameterFlightNumber (NSString) (optional) for travel bookings</li>
            ///     <li>@c kFIRParameterNumberOfPassengers (signed 64-bit integer as NSNumber) (optional)
            ///         for travel bookings</li>
            ///     <li>@c kFIRParameterNumberOfNights (signed 64-bit integer as NSNumber) (optional) for
            ///         travel bookings</li>
            ///     <li>@c kFIRParameterNumberOfRooms (signed 64-bit integer as NSNumber) (optional) for
            ///         travel bookings</li>
            ///     <li>@c kFIRParameterOrigin (NSString) (optional)</li>
            ///     <li>@c kFIRParameterDestination (NSString) (optional)</li>
            ///     <li>@c kFIRParameterSearchTerm (NSString) (optional) for travel bookings</li>
            ///     <li>@c kFIRParameterTravelClass (NSString) (optional) for travel bookings</li>
            /// </ul>
            static const std::string kFIREventViewItem;

            /// View Item List event. Log this event when the user has been presented with a list of items of a
            /// certain category. Params:
            ///
            /// <ul>
            ///     <li>@c kFIRParameterItemCategory (NSString)</li>
            /// </ul>
            static const std::string kFIREventViewItemList;

            /// View Search Results event. Log this event when the user has been presented with the results of a
            /// search. Params:
            ///
            /// <ul>
            ///     <li>@c kFIRParameterSearchTerm (NSString)</li>
            /// </ul>
            static const std::string kFIREventViewSearchResults;

            /// Level Start event. Log this event when the user starts a new level. Params:
            ///
            /// <ul>
            ///     <li>@c kFIRParameterLevelName (NSString)</li>
            /// </ul>
            static const std::string kFIREventLevelStart;

            /// Level End event. Log this event when the user finishes a level. Params:
            ///
            /// <ul>
            ///     <li>@c kFIRParameterLevelName (NSString)</li>
            ///     <li>@c kFIRParameterSuccess (NSString)</li>
            /// </ul>
            static const std::string kFIREventLevelEnd;



            /*
             * Firebase Event Parametr Names Define
             */
            ///
            /// Params supply information that contextualize Events. You can associate up to 25 unique Params
            /// with each Event type. Some Params are suggested below for certain common Events, but you are
            /// not limited to these. You may supply extra Params for suggested Events or custom Params for
            /// Custom events. Param names can be up to 40 characters long, may only contain alphanumeric
            /// characters and underscores ("_"), and must start with an alphabetic character. Param values can
            /// be up to 100 characters long. The "firebase_" prefix is reserved and should not be used.

            /// Game achievement ID (NSString).
            /// <pre>
            ///     NSDictionary *params = @{
            ///       kFIRParameterAchievementID : @"10_matches_won",
            ///       // ...
            ///     };
            /// </pre>
            static const std::string kFIRParameterAchievementID;

            /// Ad Network Click ID (NSString). Used for network-specific click IDs which vary in format.
            /// <pre>
            ///     NSDictionary *params = @{
            ///       kFIRParameterAdNetworkClickID : @"1234567",
            ///       // ...
            ///     };
            /// </pre>
            static const std::string kFIRParameterAdNetworkClickID;

            /// The store or affiliation from which this transaction occurred (NSString).
            /// <pre>
            ///     NSDictionary *params = @{
            ///       kFIRParameterAffiliation : @"Google Store",
            ///       // ...
            ///     };
            /// </pre>
            static const std::string kFIRParameterAffiliation;

            /// The individual campaign name, slogan, promo code, etc. Some networks have pre-defined macro to
            /// capture campaign information, otherwise can be populated by developer. Highly Recommended
            /// (NSString).
            /// <pre>
            ///     NSDictionary *params = @{
            ///       kFIRParameterCampaign : @"winter_promotion",
            ///       // ...
            ///     };
            /// </pre>
            static const std::string kFIRParameterCampaign;

            /// Character used in game (NSString).
            /// <pre>
            ///     NSDictionary *params = @{
            ///       kFIRParameterCharacter : @"beat_boss",
            ///       // ...
            ///     };
            /// </pre>
            static const std::string kFIRParameterCharacter;

            /// The checkout step (1..N) (unsigned 64-bit integer as NSNumber).
            /// <pre>
            ///     NSDictionary *params = @{
            ///       kFIRParameterCheckoutStep : @"1",
            ///       // ...
            ///     };
            /// </pre>
            static const std::string kFIRParameterCheckoutStep;

            /// Some option on a step in an ecommerce flow (NSString).
            /// <pre>
            ///     NSDictionary *params = @{
            ///       kFIRParameterCheckoutOption : @"Visa",
            ///       // ...
            ///     };
            /// </pre>
            static const std::string kFIRParameterCheckoutOption;



            /// Campaign content (NSString).
            static const std::string kFIRParameterContent;

            /// Type of content selected (NSString).
            /// <pre>
            ///     NSDictionary *params = @{
            ///       kFIRParameterContentType : @"news article",
            ///       // ...
            ///     };
            /// </pre>
            static const std::string kFIRParameterContentType;

            /// Coupon code for a purchasable item (NSString).
            /// <pre>
            ///     NSDictionary *params = @{
            ///       kFIRParameterCoupon : @"zz123",
            ///       // ...
            ///     };
            /// </pre>
            static const std::string kFIRParameterCoupon;

            /// Campaign custom parameter (NSString). Used as a method of capturing custom data in a campaign.
            /// Use varies by network.
            /// <pre>
            ///     NSDictionary *params = @{
            ///       kFIRParameterCP1 : @"custom_data",
            ///       // ...
            ///     };
            /// </pre>
            static const std::string kFIRParameterCP1;

            /// The name of a creative used in a promotional spot (NSString).
            /// <pre>
            ///     NSDictionary *params = @{
            ///       kFIRParameterCreativeName : @"Summer Sale",
            ///       // ...
            ///     };
            /// </pre>
            static const std::string kFIRParameterCreativeName;

            /// The name of a creative slot (NSString).
            /// <pre>
            ///     NSDictionary *params = @{
            ///       kFIRParameterCreativeSlot : @"summer_banner2",
            ///       // ...
            ///     };
            /// </pre>
            static const std::string kFIRParameterCreativeSlot;

            /// Purchase currency in 3-letter <a href="http://en.wikipedia.org/wiki/ISO_4217#Active_codes">
            /// ISO_4217</a> format (NSString).
            /// <pre>
            ///     NSDictionary *params = @{
            ///       kFIRParameterCurrency : @"USD",
            ///       // ...
            ///     };
            /// </pre>
            static const std::string kFIRParameterCurrency;

            /// Flight or Travel destination (NSString).
            /// <pre>
            ///     NSDictionary *params = @{
            ///       kFIRParameterDestination : @"Mountain View, CA",
            ///       // ...
            ///     };
            /// </pre>
            static const std::string kFIRParameterDestination;

            /// The arrival date, check-out date or rental end date for the item. This should be in
            /// YYYY-MM-DD format (NSString).
            /// <pre>
            ///     NSDictionary *params = @{
            ///       kFIRParameterEndDate : @"2015-09-14",
            ///       // ...
            ///     };
            /// </pre>
            static const std::string kFIRParameterEndDate;

            /// Flight number for travel events (NSString).
            /// <pre>
            ///     NSDictionary *params = @{
            ///       kFIRParameterFlightNumber : @"ZZ800",
            ///       // ...
            ///     };
            /// </pre>
            static const std::string kFIRParameterFlightNumber;

            /// Group/clan/guild ID (NSString).
            /// <pre>
            ///     NSDictionary *params = @{
            ///       kFIRParameterGroupID : @"g1",
            ///       // ...
            ///     };
            /// </pre>
            static const std::string kFIRParameterGroupID;

            /// Index of an item in a list (signed 64-bit integer as NSNumber).
            /// <pre>
            ///     NSDictionary *params = @{
            ///       kFIRParameterIndex : @(1),
            ///       // ...
            ///     };
            /// </pre>
            static const std::string kFIRParameterIndex;

            /// Item brand (NSString).
            /// <pre>
            ///     NSDictionary *params = @{
            ///       kFIRParameterItemBrand : @"Google",
            ///       // ...
            ///     };
            /// </pre>
            static const std::string kFIRParameterItemBrand;

            /// Item category (NSString).
            /// <pre>
            ///     NSDictionary *params = @{
            ///       kFIRParameterItemCategory : @"t-shirts",
            ///       // ...
            ///     };
            /// </pre>
            static const std::string kFIRParameterItemCategory;

            /// Item ID (NSString).
            /// <pre>
            ///     NSDictionary *params = @{
            ///       kFIRParameterItemID : @"p7654",
            ///       // ...
            ///     };
            /// </pre>
            static const std::string kFIRParameterItemID;

            /// The Google <a href="https://developers.google.com/places/place-id">Place ID</a> (NSString) that
            /// corresponds to the associated item. Alternatively, you can supply your own custom Location ID.
            /// <pre>
            ///     NSDictionary *params = @{
            ///       kFIRParameterItemLocationID : @"ChIJiyj437sx3YAR9kUWC8QkLzQ",
            ///       // ...
            ///     };
            /// </pre>
            static const std::string kFIRParameterItemLocationID;

            /// Item name (NSString).
            /// <pre>
            ///     NSDictionary *params = @{
            ///       kFIRParameterItemName : @"abc",
            ///       // ...
            ///     };
            /// </pre>
            static const std::string kFIRParameterItemName;

            /// The list in which the item was presented to the user (NSString).
            /// <pre>
            ///     NSDictionary *params = @{
            ///       kFIRParameterItemList : @"Search Results",
            ///       // ...
            ///     };
            /// </pre>
            static const std::string kFIRParameterItemList;

            /// Item variant (NSString).
            /// <pre>
            ///     NSDictionary *params = @{
            ///       kFIRParameterItemVariant : @"Red",
            ///       // ...
            ///     };
            /// </pre>
            static const std::string kFIRParameterItemVariant;

            /// Level in game (signed 64-bit integer as NSNumber).
            /// <pre>
            ///     NSDictionary *params = @{
            ///       kFIRParameterLevel : @(42),
            ///       // ...
            ///     };
            /// </pre>
            static const std::string kFIRParameterLevel;

            /// Location (NSString). The Google <a href="https://developers.google.com/places/place-id">Place ID
            /// </a> that corresponds to the associated event. Alternatively, you can supply your own custom
            /// Location ID.
            /// <pre>
            ///     NSDictionary *params = @{
            ///       kFIRParameterLocation : @"ChIJiyj437sx3YAR9kUWC8QkLzQ",
            ///       // ...
            ///     };
            /// </pre>
            static const std::string kFIRParameterLocation;

            /// The advertising or marketing medium, for example: cpc, banner, email, push. Highly recommended
            /// (NSString).
            /// <pre>
            ///     NSDictionary *params = @{
            ///       kFIRParameterMedium : @"email",
            ///       // ...
            ///     };
            /// </pre>
            static const std::string kFIRParameterMedium;

            /// Number of nights staying at hotel (signed 64-bit integer as NSNumber).
            /// <pre>
            ///     NSDictionary *params = @{
            ///       kFIRParameterNumberOfNights : @(3),
            ///       // ...
            ///     };
            /// </pre>
            static const std::string kFIRParameterNumberOfNights;

            /// Number of passengers traveling (signed 64-bit integer as NSNumber).
            /// <pre>
            ///     NSDictionary *params = @{
            ///       kFIRParameterNumberOfPassengers : @(11),
            ///       // ...
            ///     };
            /// </pre>
            static const std::string kFIRParameterNumberOfPassengers;

            /// Number of rooms for travel events (signed 64-bit integer as NSNumber).
            /// <pre>
            ///     NSDictionary *params = @{
            ///       kFIRParameterNumberOfRooms : @(2),
            ///       // ...
            ///     };
            /// </pre>
            static const std::string kFIRParameterNumberOfRooms;

            /// Flight or Travel origin (NSString).
            /// <pre>
            ///     NSDictionary *params = @{
            ///       kFIRParameterOrigin : @"Mountain View, CA",
            ///       // ...
            ///     };
            /// </pre>
            static const std::string kFIRParameterOrigin;

            /// Purchase price (double as NSNumber).
            /// <pre>
            ///     NSDictionary *params = @{
            ///       kFIRParameterPrice : @(1.0),
            ///       kFIRParameterCurrency : @"USD",  // e.g. $1.00 USD
            ///       // ...
            ///     };
            /// </pre>
            static const std::string kFIRParameterPrice;

            /// Purchase quantity (signed 64-bit integer as NSNumber).
            /// <pre>
            ///     NSDictionary *params = @{
            ///       kFIRParameterQuantity : @(1),
            ///       // ...
            ///     };
            /// </pre>
            static const std::string kFIRParameterQuantity;

            /// Score in game (signed 64-bit integer as NSNumber).
            /// <pre>
            ///     NSDictionary *params = @{
            ///       kFIRParameterScore : @(4200),
            ///       // ...
            ///     };
            /// </pre>
            static const std::string kFIRParameterScore;

            /// The search string/keywords used (NSString).
            /// <pre>
            ///     NSDictionary *params = @{
            ///       kFIRParameterSearchTerm : @"periodic table",
            ///       // ...
            ///     };
            /// </pre>
            static const std::string kFIRParameterSearchTerm;

            /// Shipping cost (double as NSNumber).
            /// <pre>
            ///     NSDictionary *params = @{
            ///       kFIRParameterShipping : @(9.50),
            ///       kFIRParameterCurrency : @"USD",  // e.g. $9.50 USD
            ///       // ...
            ///     };
            /// </pre>
            static const std::string kFIRParameterShipping;

            /// Sign up method (NSString).
            /// <pre>
            ///     NSDictionary *params = @{
            ///       kFIRParameterSignUpMethod : @"google",
            ///       // ...
            ///     };
            /// </pre>
            ///
            /// <b>This constant has been deprecated. Use Method constant instead.</b>
            static const std::string kFIRParameterSignUpMethod;

            /// A particular approach used in an operation; for example, "facebook" or "email" in the context
            /// of a sign_up or login event.  (NSString).
            /// <pre>
            ///     NSDictionary *params = @{
            ///       kFIRParameterMethod : @"google",
            ///       // ...
            ///     };
            /// </pre>
            static const std::string kFIRParameterMethod;

            /// The origin of your traffic, such as an Ad network (for example, google) or partner (urban
            /// airship). Identify the advertiser, site, publication, etc. that is sending traffic to your
            /// property. Highly recommended (NSString).
            /// <pre>
            ///     NSDictionary *params = @{
            ///       kFIRParameterSource : @"InMobi",
            ///       // ...
            ///     };
            /// </pre>
            static const std::string kFIRParameterSource;

            /// The departure date, check-in date or rental start date for the item. This should be in
            /// YYYY-MM-DD format (NSString).
            /// <pre>
            ///     NSDictionary *params = @{
            ///       kFIRParameterStartDate : @"2015-09-14",
            ///       // ...
            ///     };
            /// </pre>
            static const std::string kFIRParameterStartDate;

            /// Tax amount (double as NSNumber).
            /// <pre>
            ///     NSDictionary *params = @{
            ///       kFIRParameterTax : @(1.0),
            ///       kFIRParameterCurrency : @"USD",  // e.g. $1.00 USD
            ///       // ...
            ///     };
            /// </pre>
            static const std::string kFIRParameterTax;

            /// If you're manually tagging keyword campaigns, you should use utm_term to specify the keyword
            /// (NSString).
            /// <pre>
            ///     NSDictionary *params = @{
            ///       kFIRParameterTerm : @"game",
            ///       // ...
            ///     };
            /// </pre>
            static const std::string kFIRParameterTerm;

            /// A single ID for a ecommerce group transaction (NSString).
            /// <pre>
            ///     NSDictionary *params = @{
            ///       kFIRParameterTransactionID : @"ab7236dd9823",
            ///       // ...
            ///     };
            /// </pre>
            static const std::string kFIRParameterTransactionID;

            /// Travel class (NSString).
            /// <pre>
            ///     NSDictionary *params = @{
            ///       kFIRParameterTravelClass : @"business",
            ///       // ...
            ///     };
            /// </pre>
            static const std::string kFIRParameterTravelClass;

            /// A context-specific numeric value which is accumulated automatically for each event type. This is
            /// a general purpose parameter that is useful for accumulating a key metric that pertains to an
            /// event. Examples include revenue, distance, time and points. Value should be specified as signed
            /// 64-bit integer or double as NSNumber. Notes: Values for pre-defined currency-related events
            /// (such as @c kFIREventAddToCart) should be supplied using double as NSNumber and must be
            /// accompanied by a @c kFIRParameterCurrency parameter. The valid range of accumulated values is
            /// [-9,223,372,036,854.77, 9,223,372,036,854.77]. Supplying a non-numeric value, omitting the
            /// corresponding @c kFIRParameterCurrency parameter, or supplying an invalid
            /// <a href="https://goo.gl/qqX3J2">currency code</a> for conversion events will cause that
            /// conversion to be omitted from reporting.
            /// <pre>
            ///     NSDictionary *params = @{
            ///       kFIRParameterValue : @(3.99),
            ///       kFIRParameterCurrency : @"USD",  // e.g. $3.99 USD
            ///       // ...
            ///     };
            /// </pre>
            static const std::string kFIRParameterValue;

            /// Name of virtual currency type (NSString).
            /// <pre>
            ///     NSDictionary *params = @{
            ///       kFIRParameterVirtualCurrencyName : @"virtual_currency_name",
            ///       // ...
            ///     };
            /// </pre>
            static const std::string kFIRParameterVirtualCurrencyName;

            /// The name of a level in a game (NSString).
            /// <pre>
            ///     NSDictionary *params = @{
            ///       kFIRParameterLevelName : @"room_1",
            ///       // ...
            ///     };
            /// </pre>
            static const std::string kFIRParameterLevelName;

            /// The result of an operation. Specify 1 to indicate success and 0 to indicate failure (unsigned
            /// integer as NSNumber).
            /// <pre>
            ///     NSDictionary *params = @{
            ///       kFIRParameterSuccess : @(1),
            ///       // ...
            ///     };
            /// </pre>
            static const std::string kFIRParameterSuccess;

            /// Current screen class, such as the class name of the UIViewController, logged with screen_view
            /// event and added to every event (NSString). <pre>
            ///     NSDictionary *params = @{
            ///       kFIRParameterScreenClass : @"LoginViewController",
            ///       // ...
            ///     };
            /// </pre>
            static const std::string kFIRParameterScreenClass;

            /// Current screen name, such as the name of the UIViewController, logged with screen_view event and
            /// added to every event (NSString). <pre>
            ///     NSDictionary *params = @{
            ///       kFIRParameterScreenName : @"LoginView",
            ///       // ...
            ///     };
            /// </pre>
            static const std::string kFIRParameterScreenName;

            /**
             * Set GDPR
             *
             * **NOTE**: please call before 'init' function
             */
            static void setGDPR(bool enabled);


            /**
             *  initialize the plugin instance.
             */
            static bool init();

            /**
             * Use this to get the version of the SDK.
             * @return The version of the SDK.
             */
            static std::string getVersion();
            static void setUserProperty(const std::string& name, const std::string& value);
            static void setUserID(const std::string& userID);
            static void setScreenName(const std::string& screen, const std::string& screenClass);
            static void logEvent(const std::string& event, const std::map<std::string, std::string>& params);

            /**
             * Clears all analytics data for this instance from the device and resets the app instance ID.
             * FIRAnalyticsConfiguration values will be reset to the default values.
             */
            static void resetAnalyticsData();

            /**
             * Sets whether analytics collection is enabled for this app on this device.
             * This setting is persisted across app sessions. By default it is enabled. (Only for Android)
             */
            static void setAnalyticsCollectionEnabled (bool enabled);
        };

    }

    class PluginFirebase {
    public:

      /*
       * recommend use `sdkbox::Firebase::Analytics::init`
       */
        static bool init() {
            return sdkbox::Firebase::Analytics::init();
        }

    };
}

#endif
