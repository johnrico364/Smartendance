import 'package:flutter/material.dart';
import 'components/qr_code_icon_container.dart';
import 'components/title_section.dart';
import 'components/camera_scanner_button.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    const Color headerBlue = Color(0xFF9BC9FF);

    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        backgroundColor: headerBlue,
        elevation: 0,
        centerTitle: true,
        title: const Text(
          'MOM TRADING AND SERVICES',
          style: TextStyle(
            color: Colors.black87,
            fontWeight: FontWeight.bold,
            fontSize: 18,
          ),
        ),
      ),
      body: Center(
        child: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 32),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              mainAxisAlignment: MainAxisAlignment.center,
              mainAxisSize: MainAxisSize.min,
              children: const [
                QRCodeIconContainer(),
                SizedBox(height: 24),
                TitleSection(),
                SizedBox(height: 32),
                CameraScannerButton(),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
