import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import '../data/flags.dart';

// Replace with your actual flags data source, e.g.:
// import '../data/flags.dart' show flags;

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
      child: Column(
        children: [
          Expanded(
            flex: 2,
            child: Image.asset(
              'assets/images/flag_map.jpg',
              fit: BoxFit.cover,
            ),
          ),
          Expanded(
            flex: 4,
            child: Container(
              alignment: Alignment.bottomCenter,
              child: RichText(
                textAlign: TextAlign.center,
                text: TextSpan(
                  style: const TextStyle(                  
                    fontFamily: 'Papyrus',
                    fontSize: 20,
                    color: Colors.white,
                  ),
                  children: [
                    TextSpan(text: 'Fun With Flags!\n', style: TextStyle(fontSize: 32)),
                    TextSpan(text: 'Guess a country by the flag.\n', style: TextStyle(fontSize: 26)),
                    TextSpan(text: 'List of $count countries.\n\n\n\n\n\n', style: TextStyle(fontSize: 26)),
                    TextSpan(
                      text: 'GitHub\n',
                      recognizer: TapGestureRecognizer()..onTap = _openGithub,
                    ),
                    WidgetSpan(
                      alignment: PlaceholderAlignment.middle,
                      child: GestureDetector(
                        onTap: _openGithub,
                        child: Padding(
                          padding: const EdgeInsets.symmetric(vertical: 10),
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
                    TextSpan(
                      text: '\n\u00A9 Vaidul1s $year\n',
                      recognizer: TapGestureRecognizer()..onTap = _openGithub,
                    ),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
