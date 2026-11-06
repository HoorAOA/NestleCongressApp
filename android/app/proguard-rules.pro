# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

##################################################
# 1. Hermes JavaScript Engine
##################################################

-keep class com.facebook.hermes.unicode.** { *; }

##################################################
# 2. React Native JNI
##################################################

-keep class com.facebook.jni.** { *; }

##################################################
# 3. Preserve annotations used at runtime
##################################################

-keepattributes *Annotation*

##################################################
# 4. Preserve generic signatures where needed
##################################################

-keepattributes Signature

##################################################
# 5. Preserve native method names
##################################################

-keepclasseswithmembernames,includedescriptorclasses class * {
    native <methods>;
}

##################################################
# 6. Preserve enum methods used by serialization
##################################################

-keepclassmembers enum * {
    public static **[] values();
    public static ** valueOf(java.lang.String);
}