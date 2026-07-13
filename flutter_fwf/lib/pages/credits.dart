// credits_screen.dart
//
// Flutter conversion of the React Native "Credits" screen.
//
// Package dependency to add in pubspec.yaml:
//   url_launcher: ^6.2.0   (replaces expo-router's <Link href="..." target="_blank">)
//
// Assets expected (add to pubspec.yaml under flutter/assets):
//   assets/images/flag_map.jpg
//   assets/images/gg.jpg
// This file assumes a `flags` list is provided elsewhere (mirroring
// assets/data/flags.js), used only to display the count of countries.

import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

// Replace with your actual flags data source, e.g.:
// import '../data/flags.dart' show flags;
final List<dynamic> flags = <dynamic>[];

class Credits extends StatelessWidget {
  const Credits({super.key});

  Future<void> _openGithub() async {
    final uri = Uri.parse('https://github.com/Vaidul1S');
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri, mode: LaunchMode.externalApplication);
    }
  }

  @override
  Widget build(BuildContext context) {
    final count = flags.length;
    final year = DateTime.now().year;

    return Container(
      color: const Color(0x62446B77),
      child: Stack(
        children: [
          Positioned.fill(
            child: Image.asset(
              'assets/images/flag_map.jpg',
              fit: BoxFit.cover,
            ),
          ),
          Column(
            children: [
              Expanded(
                flex: 2,
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Padding(
                      padding: EdgeInsets.all(30),
                      child: Text(
                        'Fun With Flags!',
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          fontFamily: 'Papyrus',
                          fontSize: 34,
                          color: Colors.white,
                        ),
                      ),
                    ),
                    const Text(
                      'Guess a country by the flag.',
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        fontFamily: 'Papyrus',
                        fontSize: 28,
                        color: Colors.white,
                      ),
                    ),
                    Text(
                      'List of $count countries.',
                      textAlign: TextAlign.center,
                      style: const TextStyle(
                        fontFamily: 'Papyrus',
                        fontSize: 28,
                        color: Colors.white,
                      ),
                    ),
                  ],
                ),
              ),
              Expanded(
                flex: 1,
                child: Center(
                  child: RichText(
                    textAlign: TextAlign.center,
                    text: TextSpan(
                      style: const TextStyle(
                        fontFamily: 'Papyrus',
                        fontSize: 20,
                        color: Colors.white,
                      ),
                      children: [
                        TextSpan(
                          text: 'GitHub\n',
                          recognizer: TapGestureRecognizer()..onTap = _openGithub,
                        ),
                        WidgetSpan(
                          alignment: PlaceholderAlignment.middle,
                          child: GestureDetector(
                            onTap: _openGithub,
                            child: Padding(
                              padding: const EdgeInsets.only(top: 0, bottom: 0),
                              child: Transform.translate(
                                offset: const Offset(0, -12),
                                child: ClipRRect(
                                  borderRadius: BorderRadius.circular(100),
                                  child: Image.asset(
                                    'assets/images/gg.jpg',
                                    width: 100,
                                    height: 100,
                                    fit: BoxFit.cover,
                                  ),
                                ),
                              ),
                            ),
                          ),
                        ),
                        TextSpan(
                          text: '\n\u00A9 Vaidul1s $year',
                          recognizer: TapGestureRecognizer()..onTap = _openGithub,
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}